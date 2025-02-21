import { Code, Video, Book, Clock, Trophy, CheckCircle2, Brain } from 'lucide-react';

const activeTasks = [
  {
    id: 1,
    type: 'challenge',
    title: 'Array Manipulation Challenge',
    description: 'Practice array methods with this coding exercise',
    difficulty: 'medium',
    estimatedTime: '30 mins',
    progress: 0,
    icon: Code,
  },
  {
    id: 2,
    type: 'video',
    title: 'Understanding Recursion',
    description: 'Learn the fundamentals of recursive programming',
    difficulty: 'hard',
    estimatedTime: '45 mins',
    progress: 25,
    icon: Video,
  },
  {
    id: 3,
    type: 'exercise',
    title: 'JavaScript Promises',
    description: 'Master asynchronous programming concepts',
    difficulty: 'medium',
    estimatedTime: '1 hour',
    progress: 75,
    icon: Book,
  },
];

const completedTasks = [
  {
    id: 4,
    type: 'challenge',
    title: 'String Manipulation',
    description: 'Completed basic string operations challenge',
    completedDate: '2024-02-20',
    icon: Trophy,
  },
  {
    id: 5,
    type: 'exercise',
    title: 'Basic Algorithms',
    description: 'Finished fundamental algorithm exercises',
    completedDate: '2024-02-19',
    icon: Brain,
  },
];

export function Tasks() {
  return (
    <div className="animate-fadeIn top-0">
      {/* Welcome Section */}
      <div className="bg-gray-50 top-0 px-9 py-2 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
        <p className="mt-1 text-gray-600">
          Track your ongoing challenges and learning activities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8">
        {/* Active Tasks - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Tasks</h2>
            <div className="mt-4 space-y-4">
              {activeTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-gray-200 p-4 hover:border-mint-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-mint-50 p-2">
                        <task.icon className="h-5 w-5 text-mint-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.estimatedTime}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              task.difficulty === 'easy'
                                ? 'bg-green-100 text-green-700'
                                : task.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="rounded-lg bg-mint-600 px-4 py-2 text-sm font-medium text-white hover:bg-mint-700 transition-colors">
                      Continue
                    </button>
                  </div>
                  {task.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-mint-600 transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Completed Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
            <div className="mt-4 space-y-4">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-4 rounded-lg bg-gray-50 p-4"
                >
                  <div className="rounded-full bg-mint-50 p-2">
                    <task.icon className="h-5 w-5 text-mint-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Completed on{' '}
                      {new Date(task.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-mint-600 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Daily Stats */}
          <div className="bg-gradient-to-br from-mint-50 to-white rounded-xl shadow-sm border border-mint-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Progress</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-mint-600">3</p>
                <p className="text-sm text-gray-600">Tasks Completed</p>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-mint-600">2.5h</p>
                <p className="text-sm text-gray-600">Time Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}