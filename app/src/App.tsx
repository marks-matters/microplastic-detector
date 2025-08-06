import { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { MainApp } from './components/MainApp';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'auth' | 'main'>('onboarding');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleOnboardingComplete = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentScreen('main');
  };

  const handleContinueWithoutLogin = () => {
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentScreen('auth');
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="bg-green-500 text-white p-4">
        Tailwind is working!
      </div>
      
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'auth' && (
        <AuthScreen 
          onLogin={handleLogin}
          onContinueWithoutLogin={handleContinueWithoutLogin}
        />
      )}
      
      {currentScreen === 'main' && (
        <MainApp 
          user={user}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}