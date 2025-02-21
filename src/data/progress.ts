import { Progress, Notification } from '../types';

export const progress: Progress[] = [
  {
    userId: 'usr_1',
    pathId: 'path_1',
    completedMilestones: ['ms_1'],
    completedChallenges: ['ch_1'],
    points: 100,
    streak: 3,
    lastActivity: '2024-01-20T15:30:00Z'
  },
  {
    userId: 'usr_2',
    pathId: 'path_2',
    completedMilestones: ['ms_4', 'ms_5'],
    completedChallenges: ['ch_4', 'ch_5'],
    points: 250,
    streak: 5,
    lastActivity: '2024-01-21T09:45:00Z'
  }
];

export const notifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'usr_1',
    type: 'challenge',
    title: 'New Challenge Available',
    message: 'Try the Number Calculator challenge to test your Python skills!',
    read: false,
    createdAt: '2024-01-20T12:00:00Z'
  },
  {
    id: 'notif_2',
    userId: 'usr_1',
    type: 'milestone',
    title: 'Milestone Completed',
    message: 'Congratulations! You\'ve completed Python Basics milestone.',
    read: true,
    createdAt: '2024-01-19T16:30:00Z'
  },
  {
    id: 'notif_3',
    userId: 'usr_2',
    type: 'achievement',
    title: '5-Day Streak!',
    message: 'Keep up the great work! You\'ve been coding for 5 days straight.',
    read: false,
    createdAt: '2024-01-21T08:00:00Z'
  },
  {
    id: 'notif_4',
    userId: 'usr_2',
    type: 'system',
    title: 'New Resources Available',
    message: 'Check out the new JavaScript tutorials in your resource library.',
    read: false,
    createdAt: '2024-01-20T10:15:00Z'
  }
];

export const getUserProgress = (userId: string): Progress | undefined => {
  return progress.find(p => p.userId === userId);
};

export const getUserNotifications = (userId: string): Notification[] => {
  return notifications.filter(n => n.userId === userId);
};

export const getUnreadNotificationsCount = (userId: string): number => {
  return notifications.filter(n => n.userId === userId && !n.read).length;
};