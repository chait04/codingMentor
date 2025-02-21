import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function TabNavigation() {
  const tabs = [
    { name: 'Home', path: '/dashboard', exact: true },
    { name: 'Tasks', path: '/dashboard/tasks' },
    { name: 'TaskCompletion', path: '/dashboard/task-completion' },
    { name: 'Progress', path: '/dashboard/progress' },
    { name: 'Resources', path: '/dashboard/resources' },
  ];

  return (
    <div className="bg-gray-50 py-3 px-5">
      <div className="max-w-7xl px-1">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.exact}
              className={({ isActive }) =>
                cn(
                  'py-4 px-1 border-b-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-mint-600 text-mint-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}