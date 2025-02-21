import { Bell, BookOpen, Trophy, Star, Clock, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const notifications = [
  {
    id: 1,
    type: 'reminder',
    title: 'Time to practice!',
    message: 'Your daily coding challenge is waiting for you.',
    time: '2 hours ago',
    icon: Clock,
    read: false,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'New Badge Earned!',
    message: 'Congratulations! You\'ve earned the "Loop Legend" badge.',
    time: '5 hours ago',
    icon: Trophy,
    read: true,
  },
  {
    id: 3,
    type: 'course',
    title: 'New Course Available',
    message: 'Advanced JavaScript Patterns is now available.',
    time: '1 day ago',
    icon: BookOpen,
    read: false,
  },
  {
    id: 4,
    type: 'progress',
    title: 'Weekly Progress Update',
    message: 'You\'ve completed 80% of your weekly goals. Keep it up!',
    time: '2 days ago',
    icon: Star,
    read: true,
  },
];

export function Notifications() {
  return (
    <div className="space-y-6 py-3 px-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-mint/20 p-2">
            <Bell className="h-6 w-6 text-mint" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Stay updated with your learning progress</p>
          </div>
        </div>
        <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Mark all as read
        </button>
      </header>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              'relative flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md',
              !notification.read && 'border-l-4 border-mint'
            )}
          >
            <div className={cn(
              'rounded-full p-2',
              notification.type === 'reminder' && 'bg-blue-100',
              notification.type === 'achievement' && 'bg-yellow-100',
              notification.type === 'course' && 'bg-green-100',
              notification.type === 'progress' && 'bg-purple-100'
            )}>
              <notification.icon className={cn(
                'h-6 w-6',
                notification.type === 'reminder' && 'text-blue-600',
                notification.type === 'achievement' && 'text-yellow-600',
                notification.type === 'course' && 'text-green-600',
                notification.type === 'progress' && 'text-purple-600'
              )} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                </div>
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <span className="mt-2 block text-sm text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="rounded-lg bg-gray-100 px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Load More
        </button>
      </div>
    </div>
  );
}