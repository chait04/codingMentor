import { Code, Video, Book } from 'lucide-react';

export type DailyGoal = {
  id: string;
  title: string;
  type: 'challenge' | 'video' | 'exercise';
  status: 'completed' | 'in-progress' | 'pending';
  points: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  linkedContent?: string; // Reference to challenge or tutorial ID
};

export type DailyProgress = {
  date: string;
  completedGoals: number;
  totalGoals: number;
  timeSpent: number; // in minutes
  challengesCompleted: number;
  pointsEarned: number;
};

export const defaultDailyGoals: DailyGoal[] = [
  {
    id: 'goal-1',
    title: 'Complete "Array Manipulation" lesson',
    type: 'challenge',
    status: 'completed',
    points: 10,
    icon: Code,
    linkedContent: 'js-001',
  },
  {
    id: 'goal-2',
    title: 'Watch JavaScript Arrays Tutorial',
    type: 'video',
    status: 'in-progress',
    points: 5,
    icon: Video,
    linkedContent: 'js-tut-001',
  },
  {
    id: 'goal-3',
    title: 'Practice String Manipulation',
    type: 'exercise',
    status: 'pending',
    points: 15,
    icon: Book,
    linkedContent: 'py-001',
  },
];

export const userProgress: Record<string, DailyProgress> = {
  '2024-02-21': {
    date: '2024-02-21',
    completedGoals: 2,
    totalGoals: 3,
    timeSpent: 150, // 2.5 hours
    challengesCompleted: 3,
    pointsEarned: 30,
  },
  '2024-02-20': {
    date: '2024-02-20',
    completedGoals: 3,
    totalGoals: 3,
    timeSpent: 180,
    challengesCompleted: 4,
    pointsEarned: 45,
  },
};

export function markGoalAsComplete(goalId: string): void {
  const goal = defaultDailyGoals.find(g => g.id === goalId);
  if (goal) {
    goal.status = 'completed';
  }
}

export function updateDailyProgress(progress: Partial<DailyProgress>): void {
  const today = new Date().toISOString().split('T')[0];
  userProgress[today] = {
    ...userProgress[today],
    ...progress,
  };
}