import { account } from '../../lib/appwrite';
import { userService } from '../../services/userService';

export const authService = {
  async initializeSession(clerkUserId: string, token: string) {
    try {
      // Create a new session in Appwrite using the JWT from Clerk
      await account.createJWT();
      // Set the JWT token for Appwrite session
      await account.getSession(token);
      
      // Try to get existing user
      try {
        const existingUser = await userService.getUserByClerkId(clerkUserId);
        if (!existingUser) {
          throw new Error('User not found');
        }
      } catch {
        // If user doesn't exist, create a new user
        const clerkUserData = await account.get();
        await userService.createUser({
          userId: clerkUserId,
          email: clerkUserData.email,
          name: clerkUserData.name,
          preferences: {
            goal: 'Not set',
            language: 'Not set',
            skillLevel: 'Not set',
            timeCommitment: 'Not set',
            availability: 'Not set'
          }
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize session:', error);
      throw error;
    }
  },

  async endSession() {
    try {
      await account.deleteSession('current');
      return true;
    } catch (error) {
      console.error('Failed to end session:', error);
      throw error;
    }
  },

  async getCurrentSession() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Failed to get current session:', error);
      return null;
    }
  }
};