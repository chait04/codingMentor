import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Welcome } from './pages/onboarding/Welcome';
import { OnboardingSurvey } from './pages/onboarding/OnboardingSurvey';
import { LearningPath } from './pages/onboarding/LearningPath';
import { Layout } from './components/layout/Layout';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { Progress } from './features/learning/Progress';
import { Resources } from './features/learning/Resources';
import { Profile } from './features/user/Profile';
import { Settings } from './features/user/Settings';
import { Notifications } from './features/notifications/Notifications';
import { CustomerSupport } from './features/support/CustomerSupport';
import { TaskCompletion } from './features/learning/TaskCompletion';
import { Tasks } from './features/learning/Tasks';
import { Practice } from './pages/dashboard/Practice';

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-mint-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route 
          path="/" 
          element={
            isSignedIn ? (
              <Navigate to="/onboarding/survey" replace />
            ) : (
              <Welcome />
            )
          } 
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route
          path="/onboarding"
          element={
            isSignedIn ? (
              <Navigate to="/onboarding/survey" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/onboarding/survey"
          element={
            isSignedIn ? (
              <OnboardingSurvey />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/onboarding/path"
          element={
            isSignedIn ? (
              <LearningPath />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        
        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            isSignedIn ? (
              <Layout />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        >
          <Route index element={<DashboardHome/>}/>
          <Route path="progress" element={<Progress />} />
          <Route path="resources" element={<Resources />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="task-completion" element={<TaskCompletion />} />
          <Route path="practice/:id" element={<Practice />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="learningPath" element={<LearningPath />} />
          <Route path="support" element={<CustomerSupport />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;