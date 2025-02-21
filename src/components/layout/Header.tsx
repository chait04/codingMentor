import { Bell, User, BookOpen } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 ">
      {/* Top bar with notifications and profile */}
      <div className="px-4 py-3 mx-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-mint-600 p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">CodingMentor</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="p-2 text-gray-600 hover:text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="p-2 text-gray-600 hover:text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </header>
  );
}