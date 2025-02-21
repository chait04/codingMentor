import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Shield, User, Moon } from 'lucide-react';

export function Settings() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="animate-fadeIn py-3 px-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <User className="w-5 h-5 text-mint-600" />
              <span>Profile Information</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-mint-600" />
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Shield className="w-5 h-5 text-mint-600" />
              <span>Privacy & Security</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Moon className="w-5 h-5 text-mint-600" />
              <span>Appearance</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors border border-red-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}