import { useState } from 'react';
import { BookOpen, Video, Code, Filter, ExternalLink, Clock, Star } from 'lucide-react';
import { cn } from '../../utils/cn';

type ResourceType = 'all' | 'video' | 'exercise' | 'article';
type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

const resources = [
  {
    id: 1,
    type: 'video',
    title: 'Understanding JavaScript Promises',
    description: 'A comprehensive guide to asynchronous programming in JavaScript',
    duration: '15 mins',
    difficulty: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    icon: Video,
  },
  {
    id: 2,
    type: 'exercise',
    title: 'Array Manipulation Challenge',
    description: 'Practice your array methods with these coding exercises',
    difficulty: 'beginner',
    icon: Code,
  },
  {
    id: 3,
    type: 'article',
    title: 'Deep Dive into React Hooks',
    description: 'Learn how to use React Hooks effectively in your applications',
    duration: '10 mins',
    difficulty: 'advanced',
    icon: BookOpen,
  },
  // Add more resources as needed
];

export function Resources() {
  const [typeFilter, setTypeFilter] = useState<ResourceType>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel>('all');

  const filteredResources = resources.filter((resource) => {
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesDifficulty = difficultyFilter === 'all' || resource.difficulty === difficultyFilter;
    return matchesType && matchesDifficulty;
  });

  return (
    <div className="space-y-6 py-3 px-5 animate-fadeIn">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
          <p className="mt-2 text-gray-600">
            Curated content to help you master programming
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-mint px-4 py-2 font-medium text-white transition-colors hover:bg-mint/90">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </header>

      <div className="flex flex-wrap gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as ResourceType)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700"
        >
          <option value="all">All Types</option>
          <option value="video">Videos</option>
          <option value="exercise">Exercises</option>
          <option value="article">Articles</option>
        </select>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            {resource.thumbnail && (
              <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-mint/20 p-2">
                <resource.icon className="h-4 w-4 text-mint" />
              </div>
              <span className={cn(
                'rounded-full px-2 py-0.5 text-xs font-medium',
                resource.difficulty === 'beginner' && 'bg-green-100 text-green-700',
                resource.difficulty === 'intermediate' && 'bg-yellow-100 text-yellow-700',
                resource.difficulty === 'advanced' && 'bg-red-100 text-red-700'
              )}>
                {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
              </span>
              {resource.duration && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {resource.duration}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">
              {resource.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <button className="flex items-center gap-1 text-sm font-medium text-mint hover:text-mint/90">
                Start Learning
                <ExternalLink className="h-4 w-4" />
              </button>
              <button className="rounded-full p-2 text-gray-400 hover:text-mint">
                <Star className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="rounded-lg bg-gray-100 px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Load More Resources
        </button>
      </div>
    </div>
  );
}