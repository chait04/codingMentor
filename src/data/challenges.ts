import { Code, FileCode, Terminal } from 'lucide-react';

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
    id: 'py-001',
    title: 'String Reversal',
    description: 'Create a function that reverses a given string.',
    difficulty: 'easy',
    language: 'python',
    category: 'strings',
    estimatedTime: '10 mins',
    points: 10,
    starterCode: 'def reverse_string(text):\n    # Your code here',
    solution: 'def reverse_string(text):\n    return text[::-1]',
    testCases: [
      { input: '"hello"', expectedOutput: '"olleh"' },
      { input: '"python"', expectedOutput: '"nohtyp"' },
    ],
    hints: ['Python has string slicing', 'Think about string indices'],
    icon: FileCode,
  },
  {
    id: 'js-002',
    title: 'Palindrome Checker',
    description: 'Write a function that checks if a given string is a palindrome.',
    difficulty: 'medium',
    language: 'javascript',
    category: 'strings',
    estimatedTime: '20 mins',
    points: 20,
    starterCode: 'function isPalindrome(str) {\n  // Your code here\n}',
    solution: 'function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return cleaned === cleaned.split("").reverse().join("");\n}',
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: '"race a car"', expectedOutput: 'false' },
    ],
    hints: ['Remove special characters', 'Convert to lowercase'],
    icon: Terminal,
  },
];