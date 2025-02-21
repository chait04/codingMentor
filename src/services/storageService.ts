import { ID } from 'appwrite';
import { storage } from '../lib/appwrite';

const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;
const MATERIALS_BUCKET_ID = import.meta.env.VITE_APPWRITE_MATERIALS_BUCKET_ID;

export const storageService = {
  async uploadProfilePicture(file: File): Promise<string> {
    const fileId = ID.unique();
    await storage.createFile(
      PROFILE_BUCKET_ID,
      fileId,
      file
    );
    return fileId;
  },

  async getProfilePictureUrl(fileId: string): Promise<string> {
    const result = storage.getFileView(
      PROFILE_BUCKET_ID,
      fileId
    );
    return result.href;
  },

  async deleteProfilePicture(fileId: string): Promise<void> {
    await storage.deleteFile(
      PROFILE_BUCKET_ID,
      fileId
    );
  },

  async uploadLearningMaterial(file: File): Promise<string> {
    const fileId = ID.unique();
    await storage.createFile(
      MATERIALS_BUCKET_ID,
      fileId,
      file
    );
    return fileId;
  },

  async getLearningMaterialUrl(fileId: string): Promise<string> {
    const result = storage.getFileView(
      MATERIALS_BUCKET_ID,
      fileId
    );
    return result.href;
  },

  async deleteLearningMaterial(fileId: string): Promise<void> {
    await storage.deleteFile(
      MATERIALS_BUCKET_ID,
      fileId
    );
  }
};