import { ID, Query } from 'appwrite';
import { databases } from '../lib/appwrite';
import { User } from '../types/database';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

export const userService = {
  async createUser(userData: Omit<User, '$id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date().toISOString();
    const user = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        ...userData,
        createdAt: now,
        updatedAt: now,
      }
    );
    return user as unknown as User;
  },

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const now = new Date().toISOString();
    const user = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      {
        ...userData,
        updatedAt: now,
      }
    );
    return user as unknown as User;
  },

  async getUser(userId: string): Promise<User> {
    const user = await databases.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId
    );
    return user as unknown as User;
  },

  async getUserByClerkId(clerkUserId: string): Promise<User> {
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [
        Query.equal('userId', clerkUserId)
      ]
    );
    
    if (users.total === 0) {
      throw new Error('User not found');
    }

    return users.documents[0] as unknown as User;
  }
};