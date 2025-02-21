import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TabNavigation } from './TabNavigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-3">
          <TabNavigation />
          <Outlet />
        </main>
      </div>
    </div>
  );
}