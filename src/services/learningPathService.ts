import { ID, Query } from 'appwrite';
import { databases } from '../lib/appwrite';
import { LearningPath } from '../types/database';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const LEARNING_PATHS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_LEARNING_PATHS_COLLECTION_ID;

if (!DATABASE_ID || !LEARNING_PATHS_COLLECTION_ID) {
  throw new Error('Required environment variables are not set');
}

export const learningPathService = {
  async createLearningPath(pathData: Omit<LearningPath, '$id' | 'createdAt' | 'updatedAt'>): Promise<LearningPath> {
    try {
      if (!pathData.userId || !pathData.milestones) {
        throw new Error('Missing required learning path data');
      }

      const now = new Date().toISOString();
      const learningPath = await databases.createDocument(
        DATABASE_ID,
        LEARNING_PATHS_COLLECTION_ID,
        ID.unique(),
        {
          ...pathData,
          createdAt: now,
          updatedAt: now,
        }
      );
      return learningPath as unknown as LearningPath;
    } catch (error) {
      console.error('Failed to create learning path:', error);
      throw error;
    }
  },

  async updateLearningPath(pathId: string, pathData: Partial<LearningPath>): Promise<LearningPath> {
    try {
      if (!pathId) {
        throw new Error('Path ID is required');
      }

      const now = new Date().toISOString();
      const learningPath = await databases.updateDocument(
        DATABASE_ID,
        LEARNING_PATHS_COLLECTION_ID,
        pathId,
        {
          ...pathData,
          updatedAt: now,
        }
      );
      return learningPath as unknown as LearningPath;
    } catch (error) {
      console.error(`Failed to update learning path ${pathId}:`, error);
      throw error;
    }
  },

  async getLearningPath(pathId: string): Promise<LearningPath> {
    try {
      if (!pathId) {
        throw new Error('Path ID is required');
      }

      const learningPath = await databases.getDocument(
        DATABASE_ID,
        LEARNING_PATHS_COLLECTION_ID,
        pathId
      );
      return learningPath as unknown as LearningPath;
    } catch (error) {
      console.error(`Failed to get learning path ${pathId}:`, error);
      throw error;
    }
  },

  async getUserLearningPaths(userId: string): Promise<LearningPath[]> {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const paths = await databases.listDocuments(
        DATABASE_ID,
        LEARNING_PATHS_COLLECTION_ID,
        [
          Query.equal('userId', userId)
        ]
      );
      return paths.documents as unknown as LearningPath[];
    } catch (error) {
      console.error(`Failed to get learning paths for user ${userId}:`, error);
      throw error;
    }
  },

  async updateMilestoneStatus(
    pathId: string,
    milestoneIndex: number,
    status: 'Not Started' | 'In Progress' | 'Completed'
  ): Promise<LearningPath> {
    try {
      if (!pathId) {
        throw new Error('Path ID is required');
      }

      if (milestoneIndex < 0) {
        throw new Error('Milestone index must be non-negative');
      }

      const path = await this.getLearningPath(pathId);

      if (milestoneIndex >= path.milestones.length) {
        throw new Error('Milestone index out of bounds');
      }

      const updatedMilestones = [...path.milestones];
      updatedMilestones[milestoneIndex] = {
        ...updatedMilestones[milestoneIndex],
        status
      };

      const progress = (updatedMilestones.filter(m => m.status === 'Completed').length / updatedMilestones.length) * 100;

      return this.updateLearningPath(pathId, {
        milestones: updatedMilestones,
        progress
      });
    } catch (error) {
      console.error(`Failed to update milestone status for path ${pathId}:`, error);
      throw error;
    }
  }
};