import { ID, Query } from 'appwrite';
import { LearningPath, User, Resource } from '../../../types/database';
import { resourceService } from '../../../services/resourceService';
import { databases } from '../../../lib/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const LEARNING_PATHS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_LEARNING_PATHS_COLLECTION_ID;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!DATABASE_ID || !LEARNING_PATHS_COLLECTION_ID || !GEMINI_API_KEY) {
  throw new Error('Required environment variables are not set');
}

interface GeminiWeek {
  weekNumber: number;
  topic: string;
  subtopics: string[];
  estimatedHours: number;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface LearningPathData extends Partial<LearningPath> {
  status: 'active' | 'completed' | 'archived';
  milestones: Array<{
    title: string;
    topics: string[];
    duration: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }>;
}

export const learningPathService = {
  async recommendResources(userId: string): Promise<Resource[]> {
    try {
      const learningPaths = await databases.listDocuments(
        DATABASE_ID,
        LEARNING_PATHS_COLLECTION_ID,
        [
          Query.equal('userId', userId)
        ]
      ) as unknown as LearningPathData[];
      const activePath = learningPaths.find(path => path.status === 'active');
      
      if (!activePath) {
        throw new Error('No active learning path found');
      }

      const currentMilestone = activePath.milestones.find(m => m.status === 'In Progress') ||
        activePath.milestones.find(m => m.status === 'Not Started');

      if (!currentMilestone) {
        throw new Error('No available milestone found');
      }

      const resources = await Promise.all(
        currentMilestone.topics.map(topic =>
          resourceService.listResources(undefined, topic)
        )
      );

      const uniqueResources = Array.from(new Set(
        resources.flat().map(r => JSON.stringify(r))
      )).map(r => JSON.parse(r));

      return uniqueResources
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
    } catch (error) {
      console.error('Failed to recommend resources:', error);
      return [];
    }
  },

  async generateLearningPath(user: User): Promise<LearningPath> {
    try {
      // Generate learning path using Gemini API
      const path = await this.generatePathWithGemini(user.preferences);
      
      // Save to LearningPaths collection
      const learningPath = await this.saveLearningPath(user.userId, path);
      
      return learningPath;
    } catch (error) {
      console.error('Failed to generate learning path:', error);
      // Fallback to default path if Gemini fails
      return this.getDefaultLearningPath(user.userId, user.preferences.language);
    }
  },

  async generatePathWithGemini(preferences: User['preferences']): Promise<Partial<LearningPath>> {
    try {
      const prompt = `Generate an 8-week ${preferences.language} learning path for a ${preferences.skillLevel} 
        aiming to ${preferences.goal}, ${preferences.timeCommitment} commitment.`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate path with Gemini');
      }

      const data = await response.json();
      return this.parseGeminiResponse(data);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  },

  parseGeminiResponse(data: GeminiResponse): Partial<LearningPath> {
    const text = data.candidates[0].content.parts[0].text;
    try {
      const parsedData = JSON.parse(text) as { weeks: GeminiWeek[] };
      return {
        milestones: parsedData.weeks.map(week => ({
          title: `Week ${week.weekNumber}: ${week.topic}`,
          topics: week.subtopics,
          duration: `${week.estimatedHours} hours`,
          status: 'Not Started'
        })),
      };
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      throw new Error('Invalid response format from Gemini');
    }
  },

  async saveLearningPath(userId: string, pathData: Partial<LearningPath>): Promise<LearningPath> {
    const now = new Date().toISOString();
    
    const learningPath = await databases.createDocument(
      DATABASE_ID,
      LEARNING_PATHS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        ...pathData,
        createdAt: now,
        updatedAt: now,
        status: 'active'
      }
    );

    return learningPath as unknown as LearningPath;
  },

  getDefaultLearningPath(userId: string, language: string): LearningPath {
    // Provide a default learning path as fallback
    return {
        userId,
        language,
        milestones: [
            {
                title: 'Week 1: Basics',
                topics: ['Variables', 'Data Types', 'Basic Operations'],
                duration: '5 hours',
                status: 'Not Started'
            },
            // Add more default milestones...
        ],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    } as unknown as LearningPath;
  }
};