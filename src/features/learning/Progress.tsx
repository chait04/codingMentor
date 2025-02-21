import { Trophy, Target, Brain, Book, Star } from 'lucide-react';

const skills = [
  { name: 'JavaScript Basics', progress: 90, icon: Book },
  { name: 'Data Structures', progress: 65, icon: Brain },
  { name: 'Algorithms', progress: 45, icon: Target },
  { name: 'Problem Solving', progress: 75, icon: Star },
];

const achievements = [
  {
    name: 'Loop Legend',
    description: 'Completed 50 loop-based challenges',
    icon: Trophy,
    date: '2024-02-15',
  },
  {
    name: 'Array Master',
    description: 'Solved 25 array manipulation problems',
    icon: Trophy,
    date: '2024-02-10',
  },
];

const weeklyData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 2.5 },
  { day: 'Fri', hours: 1 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 2 },
];

export function Progress() {
  const maxHours = Math.max(...weeklyData.map((d) => d.hours));

  return (
    <div className="animate-fadeIn top-0 py-3 px-5">
      {/* Welcome Section */}
      <div className="bg-gray-50 top-0 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <p className="mt-1 text-gray-600">
          Track your learning journey and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Activity</h2>
            <div className="mt-4 flex h-40 items-end gap-2">
              {weeklyData.map((day) => (
                <div
                  key={day.day}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-lg bg-mint-600"
                    style={{
                      height: `${(day.hours / maxHours) * 100}%`,
                    }}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Skill Progress</h2>
            <div className="mt-4 space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <skill.icon className="h-5 w-5 text-mint-600" />
                      <span className="font-medium text-gray-900">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {skill.progress}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-mint-600 transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Achievements
            </h2>
            <div className="mt-4 space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className="flex items-start gap-4 rounded-lg bg-gray-50 p-4"
                >
                  <div className="rounded-full bg-mint-50 p-2">
                    <achievement.icon className="h-6 w-6 text-mint-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Earned on{' '}
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-mint-50 to-white rounded-xl shadow-sm border border-mint-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              AI Learning Path
            </h2>
            <p className="mt-2 text-gray-600">
              Based on your progress, we recommend focusing on:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-gray-800">
                <Brain className="h-5 w-5 text-mint-600" />
                Advanced Array Methods
              </li>
              <li className="flex items-center gap-2 text-gray-800">
                <Target className="h-5 w-5 text-mint-600" />
                Recursion Practice
              </li>
            </ul>
            <button className="mt-4 w-full py-2 px-4 bg-mint-600 text-white rounded-lg hover:bg-mint-700 transition-colors text-sm">
              View detailed recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}