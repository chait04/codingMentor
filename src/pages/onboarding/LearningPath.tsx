import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, ChevronRight, Star, Clock, Trophy } from 'lucide-react';

export function LearningPath() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Shell className="w-8 h-8 text-mint-600" />
            <h1 className="text-2xl font-bold text-gray-800">Your Custom Path is Ready!</h1>
          </div>
          <p className="text-lg text-mint-600">Master Python in 8 Weeks</p>
        </div>
      </header>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Week cards */}
          {[
            {
              week: 1,
              title: 'Python Basics',
              topics: ['Variables', 'Data Types', 'Control Flow'],
              hours: 5,
              challenge: 'Reverse a String',
            },
            {
              week: 2,
              title: 'Functions & Lists',
              topics: ['Functions', 'Lists', 'List Comprehension'],
              hours: 6,
              challenge: 'Find Max Number',
            },
            // Add more weeks as needed
          ].map((week, index) => (
            <div
              key={week.week}
              className={`bg-white rounded-xl border border-gray-200 p-6 transition-all hover:border-mint-300 ${
                index === 0 ? 'ring-2 ring-mint-600' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Week {week.week}: {week.title}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {week.topics.map((topic) => (
                      <li key={topic} className="text-gray-600 flex items-center gap-2">
                        <Star className="w-4 h-4 text-mint-600" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{week.hours} hours</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Daily Challenge</p>
                    <p className="font-medium text-gray-800">{week.challenge}</p>
                  </div>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-mint-50 text-mint-700 rounded-full text-sm font-medium">
                      Start Here
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="mt-8 bg-mint-50 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-6 h-6 text-mint-600" />
            <h3 className="text-lg font-semibold text-gray-800">Your Learning Journey</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <p className="text-2xl font-bold text-mint-600">8</p>
              <p className="text-sm text-gray-600">Weeks</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-2xl font-bold text-mint-600">40+</p>
              <p className="text-sm text-gray-600">Challenges</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-2xl font-bold text-mint-600">24</p>
              <p className="text-sm text-gray-600">Projects</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 px-6 py-3 rounded-lg bg-mint-600 text-white font-medium hover:bg-mint-700 transition-colors flex items-center justify-center gap-2"
          >
            Start Now
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/onboarding/survey')}
            className="px-6 py-3 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
          >
            Edit Preferences
          </button>
        </div>
      </div>
    </div>
  );
}