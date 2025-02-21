export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'mentor';
  joinedAt: string;
  preferences: {
    language: string;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    learningGoal: string;
    availableHours: number;
    preferredTime: string;
  };
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: number; // in weeks
  language: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  week: number;
  topics: string[];
  estimatedHours: number;
  challenge: Challenge;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'documentation' | 'exercise';
  url: string;
  description: string;
  language: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface Progress {
  userId: string;
  pathId: string;
  completedMilestones: string[];
  completedChallenges: string[];
  points: number;
  streak: number;
  lastActivity: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'challenge' | 'milestone' | 'achievement' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}