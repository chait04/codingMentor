import { DailyChallenge, LearningPath, Progress } from '../../../types/database';
import { progressService } from '../../../services/progressService';
import { learningPathService } from '../../../services/learningPathService';
import { dailyChallengeService } from '../../../services/dailyChallengeService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const dailyChallengeGenerator = {
  async generateDailyChallenges(userId: string): Promise<DailyChallenge> {
    try {
      // Get user's learning path and progress
      const [learningPaths, progressList] = await Promise.all([
        learningPathService.getUserLearningPaths(userId),
        progressService.getUserProgress(userId)
      ]);

      const activePath = learningPaths.find(path => path.isActive);
      if (!activePath) {
        throw new Error('No active learning path found');
      }

      // Generate challenges using Gemini
      const challenges = await this.generateChallengesWithGemini(activePath, progressList);
      
      // Create daily challenge
      const today = new Date().toISOString().split('T')[0];
      const dailyChallenge = await dailyChallengeService.createDailyChallenge({
        userId,
        date: today,
        challenges
      });

      return dailyChallenge;
    } catch (error) {
      console.error('Failed to generate daily challenges:', error);
      // Fallback to default challenges
      return this.getDefaultChallenges(userId);
    }
  },

  async generateChallengesWithGemini(
    learningPath: LearningPath,
    progressList: Progress[]
  ) {
    try {
      // Get current milestone and topics
      const currentMilestone = learningPath.milestones.find(m => m.status === 'In Progress') ||
        learningPath.milestones.find(m => m.status === 'Not Started');

      if (!currentMilestone) {
        throw new Error('No available milestone found');
      }

      // Get user's weaknesses from progress
      const weaknesses = progressList.flatMap(p => p.weaknesses);
      const uniqueWeaknesses = [...new Set(weaknesses)];

      const prompt = `Generate 3 coding challenges for ${learningPath.language} focusing on these topics: 
        ${currentMilestone.topics.join(', ')}. 
        If applicable, include exercises for these weak areas: ${uniqueWeaknesses.join(', ')}.
        For each challenge include:
        1. A clear problem description
        2. Difficulty level (Easy/Medium/Hard)
        3. Example input/output
        Format as JSON.`;

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
        throw new Error('Failed to generate challenges with Gemini');
      }

      const data = await response.json();
      return this.parseGeminiResponse(data);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseGeminiResponse(data: any) {
    const text = data.candidates[0].content.parts[0].text;
    try {
      const challenges = JSON.parse(text);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return challenges.map((challenge: any) => ({
        type: 'coding',
        content: JSON.stringify(challenge),
        difficulty: challenge.difficulty,
        status: 'pending'
      }));
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      throw error;
    }
  },

  getDefaultChallenges(userId: string): DailyChallenge {
    const today = new Date().toISOString().split('T')[0];
    return {
      userId,
      date: today,
      challenges: [
        {
          type: 'coding',
          content: JSON.stringify({
            title: 'Basic Variable Operations',
            description: 'Create variables of different types and perform basic operations',
            examples: 'Example: Declare a number and string, then concatenate them'
          }),
          difficulty: 'Easy',
          status: 'pending'
        },
        {
          type: 'coding',
          content: JSON.stringify({
            title: 'Control Flow Practice',
            description: 'Write a program using if statements and loops',
            examples: 'Example: Print numbers 1-10 but only if they\'re even'
          }),
          difficulty: 'Medium',
          status: 'pending'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as DailyChallenge;
  }
};