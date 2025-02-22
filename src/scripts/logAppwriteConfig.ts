import { databases } from '../lib/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

async function logCollectionData() {
  try {
    // Log Users Collection
    console.log('\n=== Users Collection ===');
    const users = await databases.listDocuments(DATABASE_ID, 'users');
    console.log('Total Users:', users.total);
    console.log('Sample User:', users.documents[0]);

    // Log Learning Paths
    console.log('\n=== Learning Paths Collection ===');
    const learningPaths = await databases.listDocuments(DATABASE_ID, 'learningPaths');
    console.log('Total Learning Paths:', learningPaths.total);
    console.log('Sample Learning Path:', learningPaths.documents[0]);

    // Log Daily Challenges
    console.log('\n=== Daily Challenges Collection ===');
    const dailyChallenges = await databases.listDocuments(DATABASE_ID, 'dailyChallenges');
    console.log('Total Daily Challenges:', dailyChallenges.total);
    console.log('Sample Daily Challenge:', dailyChallenges.documents[0]);

    // Log Progress
    console.log('\n=== Progress Collection ===');
    const progress = await databases.listDocuments(DATABASE_ID, 'progress');
    console.log('Total Progress Records:', progress.total);
    console.log('Sample Progress:', progress.documents[0]);

    // Log Resources
    console.log('\n=== Resources Collection ===');
    const resources = await databases.listDocuments(DATABASE_ID, 'resources');
    console.log('Total Resources:', resources.total);
    console.log('Sample Resource:', resources.documents[0]);

    // Log Notifications
    console.log('\n=== Notifications Collection ===');
    const notifications = await databases.listDocuments(DATABASE_ID, 'notifications');
    console.log('Total Notifications:', notifications.total);
    console.log('Sample Notification:', notifications.documents[0]);

    // Log Storage Buckets Info
    console.log('\n=== Storage Buckets ===');
    console.log('Profile Pictures Bucket ID: profilePictures');
    console.log('Learning Materials Bucket ID: learningMaterials');

  } catch (error) {
    console.error('Error fetching collection data:', error);
  }
}

// Execute the logging function
logCollectionData();