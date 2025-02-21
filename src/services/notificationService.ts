import { ID, Query } from 'appwrite';
import { databases } from '../lib/appwrite';
import { Notification } from '../types/database';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const NOTIFICATIONS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID;

export const notificationService = {
  async createNotification(notificationData: Omit<Notification, '$id' | 'createdAt'>): Promise<Notification> {
    const now = new Date().toISOString();
    const notification = await databases.createDocument(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      ID.unique(),
      {
        ...notificationData,
        createdAt: now,
        read: false
      }
    );
    return notification as unknown as Notification;
  },

  async getNotification(notificationId: string): Promise<Notification> {
    const notification = await databases.getDocument(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      notificationId
    );
    return notification as unknown as Notification;
  },

  async getUserNotifications(userId: string, onlyUnread?: boolean): Promise<Notification[]> {
    const queries = [Query.equal('userId', userId)];
    
    if (onlyUnread) {
      queries.push(Query.equal('read', false));
    }

    const notifications = await databases.listDocuments(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      queries
    );
    return notifications.documents as unknown as Notification[];
  },

  async markAsRead(notificationId: string): Promise<Notification> {
    const notification = await databases.updateDocument(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      notificationId,
      { read: true }
    );
    return notification as unknown as Notification;
  },

  async markAllAsRead(userId: string): Promise<void> {
    const unreadNotifications = await this.getUserNotifications(userId, true);
    await Promise.all(
      unreadNotifications.map(notification =>
        this.markAsRead(notification.$id!)
      )
    );
  }
};