// import { Models } from 'appwrite';
// import { realtime } from '../lib/appwrite';
// import { Notification, Progress, DailyChallenge } from '../types/database';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const NOTIFICATIONS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID;
// const PROGRESS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROGRESS_COLLECTION_ID;
// const DAILY_CHALLENGES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_DAILY_CHALLENGES_COLLECTION_ID;

// if (!DATABASE_ID || !NOTIFICATIONS_COLLECTION_ID || !PROGRESS_COLLECTION_ID || !DAILY_CHALLENGES_COLLECTION_ID) {
//   throw new Error('Required environment variables are not set');
// }

// type RealtimePayload<T> = {
//   payload: T & { userId: string };
//   events: string[];
// };

// export const realtimeService = {
//   subscribeToNotifications(userId: string, callback: (payload: Notification) => void): (() => void) {
//     try {
//       return realtime.subscribe(
//         [`databases.${DATABASE_ID}.collections.${NOTIFICATIONS_COLLECTION_ID}.documents`],
//         (response: any) => {
//           // Type the response as any since RealtimeResponseEvent is not available
//           if (response.payload?.userId === userId) {
//             callback(response.payload as Notification);
//           }
//         }
//       );
//     } catch (error) {
//       console.error('Failed to subscribe to notifications:', error);
//       throw error;
//     }
//   },

//   subscribeToProgress(userId: string, callback: (payload: Progress) => void): (() => void) {
//     try {
//       return realtime.subscribe(
//         [`databases.${DATABASE_ID}.collections.${PROGRESS_COLLECTION_ID}.documents`],
//         (response) => {
//           const typedResponse = response as unknown as Models.RealtimeResponseEvent<RealtimePayload<Progress>>;
//           if (typedResponse.payload?.userId === userId) {
//             callback(typedResponse.payload);
//           }
//         }
//       );
//     } catch (error) {
//       console.error('Failed to subscribe to progress:', error);
//       throw error;
//     }
//   },

//   subscribeToDailyChallenges(userId: string, callback: (payload: DailyChallenge) => void): (() => void) {
//     try {
//       return realtime.subscribe(
//         [`databases.${DATABASE_ID}.collections.${DAILY_CHALLENGES_COLLECTION_ID}.documents`],
//         (response) => {
//           const typedResponse = response as unknown as Models.RealtimeResponseEvent<RealtimePayload<DailyChallenge>>;
//           if (typedResponse.payload?.userId === userId) {
//             callback(typedResponse.payload);
//           }
//         }
//       );
//     } catch (error) {
//       console.error('Failed to subscribe to daily challenges:', error);
//       throw error;
//     }
//   },

//   unsubscribe(subscription: (() => void) | undefined): void {
//     try {
//       if (typeof subscription === 'function') {
//         subscription();
//       }
//     } catch (error) {
//       console.error('Failed to unsubscribe:', error);
//       throw error;
//     }
//   }
// };