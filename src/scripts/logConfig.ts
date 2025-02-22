import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b792750001ae74410a');

const databases = new Databases(client);

async function logCollectionData() {
  try {
    const DATABASE_ID = 'codingMentorDB';

    // Log Users Collection
    console.log('\n=== Users Collection ===');
    const users = await databases.listDocuments(DATABASE_ID, 'users');
    console.log('Total Users:', users.total);
    console.log('All Users:', JSON.stringify(users.documents, null, 2));

    // Log Learning Paths
    console.log('\n=== Learning Paths Collection ===');
    const learningPaths = await databases.listDocuments(DATABASE_ID, 'learningPaths');
    console.log('Total Learning Paths:', learningPaths.total);
    console.log('All Learning Paths:', JSON.stringify(learningPaths.documents, null, 2));

    // Log Daily Challenges
    console.log('\n=== Daily Challenges Collection ===');
    const dailyChallenges = await databases.listDocuments(DATABASE_ID, 'dailyChallenges');
    console.log('Total Daily Challenges:', dailyChallenges.total);
    console.log('All Daily Challenges:', JSON.stringify(dailyChallenges.documents, null, 2));

    // Log Progress
    console.log('\n=== Progress Collection ===');
    const progress = await databases.listDocuments(DATABASE_ID, 'progress');
    console.log('Total Progress Records:', progress.total);
    console.log('All Progress Records:', JSON.stringify(progress.documents, null, 2));

    // Log Resources
    console.log('\n=== Resources Collection ===');
    const resources = await databases.listDocuments(DATABASE_ID, 'resources');
    console.log('Total Resources:', resources.total);
    console.log('All Resources:', JSON.stringify(resources.documents, null, 2));

    // Log Notifications
    console.log('\n=== Notifications Collection ===');
    const notifications = await databases.listDocuments(DATABASE_ID, 'notifications');
    console.log('Total Notifications:', notifications.total);
    console.log('All Notifications:', JSON.stringify(notifications.documents, null, 2));

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