import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Mail, Lock, User } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userData: { name: string; email: string }) => void;
  onContinueWithoutLogin: () => void;
}

export function AuthScreen({ onLogin, onContinueWithoutLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    onLogin({
      name: formData.name || 'Demo User',
      email: formData.email || 'demo@example.com'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 bg-background">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="mb-2">Welcome to MicroDetect</h1>
          <p className="text-muted-foreground">
            Join the community fighting microplastic pollution
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>

          <div className="flex items-center my-6">
            <Separator className="flex-1" />
            <span className="px-4 text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button 
            variant="outline" 
            onClick={onContinueWithoutLogin}
            className="w-full"
            size="lg"
          >
            Continue without account
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Without an account, your data will only be stored locally and won't contribute to the community database.
          </p>
        </Card>
      </div>
    </div>
  );
}