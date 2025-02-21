import { User } from '../types';

export const users: User[] = [
  {
    id: 'usr_1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'student',
    joinedAt: '2024-01-15T08:00:00Z',
    preferences: {
      language: 'python',
      skillLevel: 'beginner',
      learningGoal: 'Learn a new language',
      availableHours: 2,
      preferredTime: 'Morning (8-12)'
    }
  },
  {
    id: 'usr_2',
    name: 'Sarah Chen',
    email: 'sarah.c@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'student',
    joinedAt: '2024-01-10T10:30:00Z',
    preferences: {
      language: 'javascript',
      skillLevel: 'intermediate',
      learningGoal: 'Practice your skills',
      availableHours: 1.5,
      preferredTime: 'Evening (5-10)'
    }
  },
  {
    id: 'usr_3',
    name: 'Michael Smith',
    email: 'michael.s@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'mentor',
    joinedAt: '2023-12-01T09:15:00Z',
    preferences: {
      language: 'javascript',
      skillLevel: 'advanced',
      learningGoal: 'Ace interviews',
      availableHours: 3,
      preferredTime: 'Afternoon (12-5)'
    }
  }
];

export const currentUser = users[0]; // Default to first user for demo purposes