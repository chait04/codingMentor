// Database Models

export interface User {
  $id?: string;
  userId: string; // from Clerk
  name: string;
  email: string;
  preferences: {
    goal: string;
    language: string;
    skillLevel: string;
    timeCommitment: string;
    availability: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LearningPath {
  [x: string]: unknown;
  $id?: string;
  userId: string;
  language: string;
  milestones: Array<{
    title: string;
    topics: string[];
    duration: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }>;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyChallenge {
  $id?: string;
  userId: string;
  date: string;
  challenges: Array<{
    type: string;
    content: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    status: 'pending' | 'done';
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  $id?: string;
  userId: string;
  date: string;
  timeSpent: number;
  topicsCovered: string[];
  quizScores: Array<{
    question: string;
    score: number;
  }>;
  weaknesses: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  $id?: string;
  type: 'video' | 'exercise' | 'article';
  title: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  rating?: number;
  createdAt: string;
}

export interface Notification {
  $id?: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}