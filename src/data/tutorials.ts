import { Video } from 'lucide-react';

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
    id: 'js-tut-003',
    title: 'Advanced Array Operations in JavaScript',
    description: 'Learn advanced array operations including sorting, searching, and transforming arrays.',
    duration: '40 mins',
    language: 'javascript',
    category: 'arrays',
    difficulty: 'intermediate',
    videoUrl: 'https://www.youtube.com/embed/GBIIQ0kP15E',
    instructor: 'John Smith',
    tags: ['javascript', 'arrays', 'algorithms'],
    icon: Video,
  }
];