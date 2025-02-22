import { useEffect } from 'react';
import { useUser, useAuth as useClerk } from '@clerk/clerk-react';
import { authService } from '../features/auth/authService';

export function useAuth() {
  const { isLoaded: clerkLoaded, isSignedIn, getToken } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    const initializeAppwrite = async () => {
      if (clerkLoaded && isSignedIn && user) {
        try {
          // Get JWT token from Clerk
          const token = await getToken();
          
          if (token) {
            // Initialize Appwrite session with Clerk user ID and token
            await authService.initializeSession(user.id, token);
          }
        } catch (error) {
          console.error('Failed to initialize Appwrite session:', error);
        }
      }
    };

    initializeAppwrite();
  }, [clerkLoaded, isSignedIn, user, getToken]);

  return {
    isLoaded: clerkLoaded,
    isAuthenticated: isSignedIn,
    user,
    signOut: async () => {
      try {
        // End Appwrite session
        await authService.endSession();
      } catch (error) {
        console.error('Failed to end Appwrite session:', error);
      }
    }
  };
}