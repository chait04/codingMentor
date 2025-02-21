import { NavLink } from 'react-router-dom';
import { Home, Settings, GraduationCap, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useState } from 'react';

const navigation = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Learning Path', icon: GraduationCap, href: '/dashboard/learningPath' },
  { name: 'Customer Support', icon: MessageSquare, href: '/dashboard/support' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar() {
  const [isExpanded] = useState(false);

  return (
    <aside 
      className={cn(
        "mx-2 border-r border-gray-200 bg-white py-6 flex flex-col h-screen transition-all duration-300"
      )}
    >

      <nav className="mt-8 space-y-2 px-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 py-2.5 rounded-lg transition-colors',
                isExpanded ? 'px-3' : 'justify-center px-2',
                isActive
                  ? 'bg-mint-50 text-mint-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )
            }
          >
            <item.icon className="h-6 w-6" />
            {isExpanded && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

