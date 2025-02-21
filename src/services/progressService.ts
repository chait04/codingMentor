import { ID, Query } from 'appwrite';
import { databases } from '../lib/appwrite';
import { Progress } from '../types/database';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROGRESS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROGRESS_COLLECTION_ID;

if (!DATABASE_ID || !PROGRESS_COLLECTION_ID) {
  throw new Error('Required environment variables are not set');
}

export const progressService = {
  async createProgress(progressData: Omit<Progress, '$id' | 'createdAt' | 'updatedAt'>): Promise<Progress> {
    try {
      if (!progressData.userId || !progressData.date) {
        throw new Error('Missing required progress data');
      }

      const now = new Date().toISOString();
      const progress = await databases.createDocument(
        DATABASE_ID,
        PROGRESS_COLLECTION_ID,
        ID.unique(),
        {
          ...progressData,
          createdAt: now,
          updatedAt: now,
        }
      );
      return progress as unknown as Progress;
    } catch (error) {
      console.error('Failed to create progress:', error);
      throw error;
    }
  },

  async updateProgress(progressId: string, progressData: Partial<Progress>): Promise<Progress> {
    try {
      if (!progressId) {
        throw new Error('Progress ID is required');
      }

      const now = new Date().toISOString();
      const progress = await databases.updateDocument(
        DATABASE_ID,
        PROGRESS_COLLECTION_ID,
        progressId,
        {
          ...progressData,
          updatedAt: now,
        }
      );
      return progress as unknown as Progress;
    } catch (error) {
      console.error(`Failed to update progress ${progressId}:`, error);
      throw error;
    }
  },

  async getProgress(progressId: string): Promise<Progress> {
    try {
      if (!progressId) {
        throw new Error('Progress ID is required');
      }

      const progress = await databases.getDocument(
        DATABASE_ID,
        PROGRESS_COLLECTION_ID,
        progressId
      );
      return progress as unknown as Progress;
    } catch (error) {
      console.error(`Failed to get progress ${progressId}:`, error);
      throw error;
    }
  },

  async getUserProgress(userId: string, date?: string): Promise<Progress[]> {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const queries = [Query.equal('userId', userId)];
      
      if (date) {
        if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          throw new Error('Invalid date format. Expected YYYY-MM-DD');
        }
        queries.push(Query.equal('date', date));
      }

      const progressList = await databases.listDocuments(
        DATABASE_ID,
        PROGRESS_COLLECTION_ID,
        queries
      );
      return progressList.documents as unknown as Progress[];
    } catch (error) {
      console.error(`Failed to get user progress for user ${userId}:`, error);
      throw error;
    }
  },

  async addQuizScore(
    progressId: string,
    question: string,
    score: number
  ): Promise<Progress> {
    try {
      if (!progressId || !question || typeof score !== 'number') {
        throw new Error('Invalid quiz score data');
      }

      const progress = await this.getProgress(progressId);
      const updatedScores = [...progress.quizScores, { question, score }];

      return this.updateProgress(progressId, {
        quizScores: updatedScores
      });
    } catch (error) {
      console.error(`Failed to add quiz score for progress ${progressId}:`, error);
      throw error;
    }
  },

  async updateWeaknesses(
    progressId: string,
    weaknesses: string[]
  ): Promise<Progress> {
    try {
      if (!progressId || !Array.isArray(weaknesses)) {
        throw new Error('Invalid weaknesses data');
      }

      return this.updateProgress(progressId, { weaknesses });
    } catch (error) {
      console.error(`Failed to update weaknesses for progress ${progressId}:`, error);
      throw error;
    }
  },

  async addTopicsCovered(
    progressId: string,
    newTopics: string[]
  ): Promise<Progress> {
    try {
      if (!progressId || !Array.isArray(newTopics)) {
        throw new Error('Invalid topics data');
      }

      const progress = await this.getProgress(progressId);
      const updatedTopics = [...new Set([...progress.topicsCovered, ...newTopics])];

      return this.updateProgress(progressId, {
        topicsCovered: updatedTopics
      });
    } catch (error) {
      console.error(`Failed to add topics for progress ${progressId}:`, error);
      throw error;
    }
  }
};