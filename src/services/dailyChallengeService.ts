import { ID, Query } from 'appwrite';
import { databases } from '../lib/appwrite';
import { DailyChallenge } from '../types/database';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const DAILY_CHALLENGES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_DAILY_CHALLENGES_COLLECTION_ID;

if (!DATABASE_ID || !DAILY_CHALLENGES_COLLECTION_ID) {
  throw new Error('Required environment variables are not set');
}

export const dailyChallengeService = {
  async createDailyChallenge(challengeData: Omit<DailyChallenge, '$id' | 'createdAt' | 'updatedAt'>): Promise<DailyChallenge> {
    try {
      if (!challengeData.userId || !challengeData.date || !challengeData.challenges) {
        throw new Error('Missing required challenge data');
      }

      const now = new Date().toISOString();
      const challenge = await databases.createDocument(
        DATABASE_ID,
        DAILY_CHALLENGES_COLLECTION_ID,
        ID.unique(),
        {
          ...challengeData,
          createdAt: now,
          updatedAt: now,
        }
      );
      return challenge as unknown as DailyChallenge;
    } catch (error) {
      console.error('Failed to create daily challenge:', error);
      throw error;
    }
  },

  async updateDailyChallenge(challengeId: string, challengeData: Partial<DailyChallenge>): Promise<DailyChallenge> {
    try {
      if (!challengeId) {
        throw new Error('Challenge ID is required');
      }

      const now = new Date().toISOString();
      const challenge = await databases.updateDocument(
        DATABASE_ID,
        DAILY_CHALLENGES_COLLECTION_ID,
        challengeId,
        {
          ...challengeData,
          updatedAt: now,
        }
      );
      return challenge as unknown as DailyChallenge;
    } catch (error) {
      console.error(`Failed to update daily challenge ${challengeId}:`, error);
      throw error;
    }
  },

  async getDailyChallenge(challengeId: string): Promise<DailyChallenge> {
    try {
      if (!challengeId) {
        throw new Error('Challenge ID is required');
      }

      const challenge = await databases.getDocument(
        DATABASE_ID,
        DAILY_CHALLENGES_COLLECTION_ID,
        challengeId
      );
      return challenge as unknown as DailyChallenge;
    } catch (error) {
      console.error(`Failed to get daily challenge ${challengeId}:`, error);
      throw error;
    }
  },

  async getUserDailyChallenges(userId: string, date?: string): Promise<DailyChallenge[]> {
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

      const challenges = await databases.listDocuments(
        DATABASE_ID,
        DAILY_CHALLENGES_COLLECTION_ID,
        queries
      );
      return challenges.documents as unknown as DailyChallenge[];
    } catch (error) {
      console.error(`Failed to get user daily challenges for user ${userId}:`, error);
      throw error;
    }
  },

  async updateChallengeStatus(
    challengeId: string,
    challengeIndex: number,
    status: 'pending' | 'done'
  ): Promise<DailyChallenge> {
    try {
      if (!challengeId) {
        throw new Error('Challenge ID is required');
      }

      if (challengeIndex < 0) {
        throw new Error('Challenge index must be non-negative');
      }

      const challenge = await this.getDailyChallenge(challengeId);
      
      if (challengeIndex >= challenge.challenges.length) {
        throw new Error('Challenge index out of bounds');
      }

      const updatedChallenges = [...challenge.challenges];
      updatedChallenges[challengeIndex] = {
        ...updatedChallenges[challengeIndex],
        status
      };

      return this.updateDailyChallenge(challengeId, {
        challenges: updatedChallenges
      });
    } catch (error) {
      console.error(`Failed to update challenge status for ${challengeId}:`, error);
      throw error;
    }
  }
};