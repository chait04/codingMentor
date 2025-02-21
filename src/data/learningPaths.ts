import { LearningPath } from '../types';

export const learningPaths: LearningPath[] = [
  {
    id: 'path_1',
    title: 'Python Fundamentals',
    description: 'Master Python basics and core programming concepts',
    duration: 8,
    language: 'python',
    skillLevel: 'beginner',
    milestones: [
      {
        id: 'ms_1',
        title: 'Python Basics',
        description: 'Learn Python syntax and basic programming concepts',
        week: 1,
        topics: ['Variables', 'Data Types', 'Control Flow', 'Functions'],
        estimatedHours: 5,
        challenge: {
          id: 'ch_1',
          title: 'Number Calculator',
          description: 'Create a simple calculator that performs basic arithmetic',
          difficulty: 'easy',
          points: 100
        }
      },
      {
        id: 'ms_2',
        title: 'Data Structures',
        description: 'Master Python data structures and their operations',
        week: 2,
        topics: ['Lists', 'Dictionaries', 'Sets', 'Tuples'],
        estimatedHours: 6,
        challenge: {
          id: 'ch_2',
          title: 'Contact Manager',
          description: 'Build a contact manager using dictionaries',
          difficulty: 'medium',
          points: 150
        }
      },
      {
        id: 'ms_3',
        title: 'Object-Oriented Programming',
        description: 'Learn OOP concepts in Python',
        week: 3,
        topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'],
        estimatedHours: 8,
        challenge: {
          id: 'ch_3',
          title: 'Library System',
          description: 'Create a library management system using OOP',
          difficulty: 'hard',
          points: 200
        }
      }
    ]
  },
  {
    id: 'path_2',
    title: 'JavaScript Essentials',
    description: 'Learn modern JavaScript and web development',
    duration: 6,
    language: 'javascript',
    skillLevel: 'beginner',
    milestones: [
      {
        id: 'ms_4',
        title: 'JavaScript Fundamentals',
        description: 'Master JavaScript basics and ES6+ features',
        week: 1,
        topics: ['Variables', 'Functions', 'Arrays', 'Objects'],
        estimatedHours: 5,
        challenge: {
          id: 'ch_4',
          title: 'Todo List',
          description: 'Build a simple todo list application',
          difficulty: 'easy',
          points: 100
        }
      },
      {
        id: 'ms_5',
        title: 'DOM Manipulation',
        description: 'Learn to interact with the DOM',
        week: 2,
        topics: ['Selectors', 'Events', 'DOM Methods', 'Event Handling'],
        estimatedHours: 6,
        challenge: {
          id: 'ch_5',
          title: 'Interactive Form',
          description: 'Create a form with real-time validation',
          difficulty: 'medium',
          points: 150
        }
      }
    ]
  }
];

export const getCurrentUserPath = (language: string, skillLevel: string): LearningPath => {
  return learningPaths.find(
    (path) => path.language === language && path.skillLevel === skillLevel
  ) || learningPaths[0];
};