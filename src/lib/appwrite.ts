import { Account, Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT') // We'll update this later
    .setProject('YOUR_PROJECT_ID'); // We'll update this later

export const account = new Account(client);
export const databases = new Databases(client);