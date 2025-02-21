import { Video, Code, BookOpen } from 'lucide-react';

export type Tutorial = {
  id: string;
  title: string;
  description: string;
  duration: string;
  language: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl: string;
  thumbnail?: string;
  instructor: string;
  tags: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

export const tutorials: Tutorial[] = [
  {
    id: 'js-tut-001',
    title: 'JavaScript Array Methods Deep Dive',
    description: 'Master essential array methods like map, filter, and reduce in JavaScript.',
    duration: '45 mins',
    language: 'javascript',
    category: 'arrays',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/GBIIQ0kP15E',
    instructor: 'John Smith',
    tags: ['javascript', 'arrays', 'functional programming'],
    icon: Video,
  },
  {
    id: 'py-tut-001',
    title: 'Python List Comprehension',
    description: 'Learn how to write elegant and efficient list comprehensions in Python.',
    duration: '30 mins',
    language: 'python',
    category: 'lists',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/GBIIQ0kP15E',
    instructor: 'Sarah Johnson',
    tags: ['python', 'lists', 'comprehension'],
    icon: Code,
  },
  {
    id: 'js-tut-002',
    title: 'Asynchronous JavaScript',
    description: 'Understanding Promises, async/await, and handling asynchronous operations.',
    duration: '60 mins',
    language: 'javascript',
    category: 'async',
    difficulty: 'advanced',
    videoUrl: 'https://www.youtube.com/embed/GBIIQ0kP15E',
    instructor: 'Mike Brown',
    tags: ['javascript', 'async', 'promises'],
    icon: BookOpen,
  },
];