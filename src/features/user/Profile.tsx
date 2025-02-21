import { useState } from 'react';
import { User, Mail, Bell, Moon, Sun, Clock, Target } from 'lucide-react';
import { cn } from '../../utils/cn';

type NotificationFrequency = 'daily' | 'weekly' | 'monthly';
type LearningGoal = 'interview' | 'skills' | 'language';

interface UserPreferences {
  darkMode: boolean;
  notifications: NotificationFrequency;
  learningGoal: LearningGoal;
  dailyReminder: string;
}

export function Profile() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    darkMode: false,
    notifications: 'daily',
    learningGoal: 'skills',
    dailyReminder: '09:00',
  });

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 py-3 px-5">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account preferences and settings
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Personal Info</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 rounded-full bg-mint p-1.5 text-white shadow-sm">
                <User className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">alex.johnson@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {preferences.darkMode ? (
                  <Moon className="h-5 w-5 text-mint" />
                ) : (
                  <Sun className="h-5 w-5 text-mint" />
                )}
                <span className="font-medium text-gray-900">Dark Mode</span>
              </div>
              <button
                onClick={() =>
                  updatePreference('darkMode', !preferences.darkMode)
                }
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  preferences.darkMode ? 'bg-mint' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            <div>
              <label className="block font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-mint" />
                  Notification Frequency
                </div>
              </label>
              <select
                value={preferences.notifications}
                onChange={(e) =>
                  updatePreference(
                    'notifications',
                    e.target.value as NotificationFrequency
                  )
                }
                className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-mint" />
                  Daily Reminder
                </div>
              </label>
              <input
                type="time"
                value={preferences.dailyReminder}
                onChange={(e) =>
                  updatePreference('dailyReminder', e.target.value)
                }
                className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-mint" />
                  Learning Goal
                </div>
              </label>
              <select
                value={preferences.learningGoal}
                onChange={(e) =>
                  updatePreference(
                    'learningGoal',
                    e.target.value as LearningGoal
                  )
                }
                className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2"
              >
                <option value="interview">Ace Interviews</option>
                <option value="skills">Practice Skills</option>
                <option value="language">Learn New Language</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <div className="col-span-full flex items-center justify-end gap-4">
          <button className="rounded-lg px-6 py-2 text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="rounded-lg bg-mint px-6 py-2 font-medium text-white transition-colors hover:bg-mint/90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
