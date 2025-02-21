import { Code } from 'lucide-react';

export type CodingChallenge = {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  category: string;
  estimatedTime: string;
  points: number;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  hints: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'js-001',
    title: 'Array Sum Calculator',
    description: 'Write a function that calculates the sum of all numbers in an array.',
    difficulty: 'easy',
    language: 'javascript',
    category: 'arrays',
    estimatedTime: '15 mins',
    points: 10,
    starterCode: 'function arraySum(numbers) {\n  // Your code here\n}',
    solution: 'function arraySum(numbers) {\n  return numbers.reduce((sum, num) => sum + num, 0);\n}',
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '15' },
      { input: '[-1, 0, 1]', expectedOutput: '0' },
    ],
    hints: ['Consider using array reduce method', 'Initialize sum with 0'],
    icon: Code,
  },
  {
    id: 'js-003',
    title: 'Filter Even Numbers',
    description: 'Create a function that filters out all odd numbers from an array.',
    difficulty: 'easy',
    language: 'javascript',
    category: 'arrays',
    estimatedTime: '15 mins',
    points: 10,
    starterCode: 'function filterEvenNumbers(numbers) {\n  // Your code here\n}',
    solution: 'function filterEvenNumbers(numbers) {\n  return numbers.filter(num => num % 2 === 0);\n}',
    testCases: [
      { input: '[1, 2, 3, 4, 5, 6]', expectedOutput: '[2, 4, 6]' },
      { input: '[7, 9, 11, 13]', expectedOutput: '[]' },
    ],
    hints: ['Use the array filter method', 'Check if a number is even using the modulo operator'],
    icon: Code,
  },
  {
    id: 'js-004',
    title: 'Sort Array of Numbers',
    description: 'Write a function that sorts an array of numbers in ascending order.',
    difficulty: 'easy',
    language: 'javascript',
    category: 'arrays',
    estimatedTime: '15 mins',
    points: 10,
    starterCode: 'function sortNumbers(numbers) {\n  // Your code here\n}',
    solution: 'function sortNumbers(numbers) {\n  return numbers.sort((a, b) => a - b);\n}',
    testCases: [
      { input: '[3, 1, 4, 1, 5, 9, 2, 6]', expectedOutput: '[1, 1, 2, 3, 4, 5, 6, 9]' },
      { input: '[-3, 0, -1, 5, 2]', expectedOutput: '[-3, -1, 0, 2, 5]' },
    ],
    hints: ['Use the array sort method', 'Remember to provide a comparison function for numbers'],
    icon: Code,
  }
];