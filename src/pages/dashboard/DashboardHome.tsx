import { useUser } from '@clerk/clerk-react';
import { 
  Star, 
  Clock, 
  ChevronRight, 
  Flame, 
  Trophy,
  BookOpen,
  Target,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';

export function DashboardHome() {
  const { user } = useUser();

  return (
    <div className="animate-fadeIn py-3 px-5 top-0">
      {/* Welcome Section */}
      <div className="bg-gray-50 top-0 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'there'}! 👋
        </h1>
        <p className="mt-1 text-gray-600">
          Ready to continue your coding journey? Here's what's on your plate today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Goals Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Daily Goals</h2>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-mint-600" />
                <span className="text-sm text-gray-600">2 hours left</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { task: 'Complete "Array Manipulation" lesson', status: 'completed' },
                { task: 'Solve 2 coding challenges', status: 'in-progress' },
                { task: 'Watch "Advanced Functions" video', status: 'pending' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    item.status === 'completed'
                      ? 'bg-mint-50 text-mint-700'
                      : 'bg-gray-50'
                  }`}
                >
                  <CheckCircle2 
                    className={`w-5 h-5 ${
                      item.status === 'completed' 
                        ? 'text-mint-600' 
                        : 'text-gray-400'
                    }`} 
                  />
                  <span className={item.status === 'completed' ? 'line-through' : ''}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 px-4 bg-mint-600 text-white rounded-lg hover:bg-mint-700 transition-colors flex items-center justify-center gap-2">
              Continue Learning
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Current Topic Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-mint-600" />
              <h2 className="text-lg font-semibold text-gray-800">Current Topic: Arrays & Objects</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-mint-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm text-gray-600">60% Complete</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Time Spent</div>
                  <div className="text-lg font-semibold text-gray-800">4.5 hours</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Exercises Done</div>
                  <div className="text-lg font-semibold text-gray-800">12/20</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Right Column - Stats & Progress */}
        <div className="space-y-6">
          {/* Streak Card */}
          <div className="bg-gradient-to-br from-mint-50 to-white rounded-xl shadow-sm border border-mint-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Current Streak</h2>
              <Flame className="w-6 h-6 text-mint-600" />
            </div>
            <div className="text-3xl font-bold text-mint-600 mb-2">7 Days</div>
            <p className="text-sm text-gray-600">Keep it up! You're on fire! 🔥</p>
          </div>

          {/* Progress Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-5 h-5 text-mint-600" />
              <h2 className="text-lg font-semibold text-gray-800">Your Progress</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-mint-600" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Weekly Goal</span>
                    <span className="text-sm font-medium text-mint-600">8/10 hours</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-mint-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-mint-600" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Challenge Success</span>
                    <span className="text-sm font-medium text-mint-600">85%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-mint-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Challenge */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Next Challenge</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-mint-600" />
                <span className="text-sm font-medium text-gray-800">Array Manipulation</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Practice your array skills with this medium-level challenge.
              </p>
              <button className="w-full py-2 px-4 bg-mint-600 text-white rounded-lg hover:bg-mint-700 transition-colors text-sm">
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}