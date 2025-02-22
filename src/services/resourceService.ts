import { ID, Query } from 'appwrite';
import { databases } from '../lib/appwrite';
import { Resource } from '../types/database';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const RESOURCES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_RESOURCES_COLLECTION_ID;

if (!DATABASE_ID || !RESOURCES_COLLECTION_ID) {
  throw new Error('Required environment variables are not set');
}

export const resourceService = {
  async createResource(resourceData: Omit<Resource, '$id' | 'createdAt'>): Promise<Resource> {
    try {
      if (!resourceData.title || !resourceData.type || !resourceData.url) {
        throw new Error('Missing required resource data');
      }

      const now = new Date().toISOString();
      const resource = await databases.createDocument(
        DATABASE_ID,
        RESOURCES_COLLECTION_ID,
        ID.unique(),
        {
          ...resourceData,
          createdAt: now,
        }
      );
      return resource as unknown as Resource;
    } catch (error) {
      console.error('Failed to create resource:', error);
      throw error;
    }
  },

  async getResource(resourceId: string): Promise<Resource> {
    try {
      if (!resourceId) {
        throw new Error('Resource ID is required');
      }

      const resource = await databases.getDocument(
        DATABASE_ID,
        RESOURCES_COLLECTION_ID,
        resourceId
      );
      return resource as unknown as Resource;
    } catch (error) {
      console.error(`Failed to get resource ${resourceId}:`, error);
      throw error;
    }
  },

  async listResources(
    type?: 'video' | 'exercise' | 'article',
    topic?: string,
    difficulty?: 'Easy' | 'Medium' | 'Hard'
  ): Promise<Resource[]> {
    try {
      const queries = [];
      
      if (type) {
        queries.push(Query.equal('type', type));
      }
      
      if (topic) {
        if (topic.trim().length === 0) {
          throw new Error('Topic cannot be empty');
        }
        queries.push(Query.equal('topic', topic));
      }
      
      if (difficulty) {
        queries.push(Query.equal('difficulty', difficulty));
      }

      const resources = await databases.listDocuments(
        DATABASE_ID,
        RESOURCES_COLLECTION_ID,
        queries
      );
      return resources.documents as unknown as Resource[];
    } catch (error) {
      console.error('Failed to list resources:', error);
      throw error;
    }
  },

  async updateResourceRating(resourceId: string, rating: number): Promise<Resource> {
    try {
      if (!resourceId) {
        throw new Error('Resource ID is required');
      }

      if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        throw new Error('Rating must be a number between 0 and 5');
      }

      const resource = await databases.updateDocument(
        DATABASE_ID,
        RESOURCES_COLLECTION_ID,
        resourceId,
        { rating }
      );
      return resource as unknown as Resource;
    } catch (error) {
      console.error(`Failed to update resource rating for ${resourceId}:`, error);
      throw error;
    }
  }
};