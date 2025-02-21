import { Resource } from '../types';

export const resources: Resource[] = [
  {
    id: 'res_1',
    title: 'Python for Beginners',
    type: 'video',
    url: 'https://example.com/python-basics',
    description: 'Comprehensive video course covering Python fundamentals',
    language: 'python',
    skillLevel: 'beginner',
    tags: ['basics', 'tutorial', 'programming']
  },
  {
    id: 'res_2',
    title: 'JavaScript DOM Manipulation Guide',
    type: 'article',
    url: 'https://example.com/js-dom-guide',
    description: 'Learn how to manipulate the DOM with vanilla JavaScript',
    language: 'javascript',
    skillLevel: 'intermediate',
    tags: ['DOM', 'web development', 'frontend']
  },
  {
    id: 'res_3',
    title: 'Python Data Structures Documentation',
    type: 'documentation',
    url: 'https://example.com/python-data-structures',
    description: 'Official documentation for Python data structures',
    language: 'python',
    skillLevel: 'intermediate',
    tags: ['data structures', 'reference', 'documentation']
  },
  {
    id: 'res_4',
    title: 'JavaScript Array Methods Practice',
    type: 'exercise',
    url: 'https://example.com/js-array-practice',
    description: 'Interactive exercises for mastering JavaScript array methods',
    language: 'javascript',
    skillLevel: 'beginner',
    tags: ['arrays', 'practice', 'exercises']
  },
  {
    id: 'res_5',
    title: 'Advanced Python OOP Concepts',
    type: 'video',
    url: 'https://example.com/python-oop-advanced',
    description: 'Deep dive into Object-Oriented Programming in Python',
    language: 'python',
    skillLevel: 'advanced',
    tags: ['OOP', 'classes', 'inheritance']
  }
];

export const getResourcesByLanguage = (language: string): Resource[] => {
  return resources.filter(resource => resource.language === language);
};

export const getResourcesBySkillLevel = (skillLevel: string): Resource[] => {
  return resources.filter(resource => resource.skillLevel === skillLevel);
};