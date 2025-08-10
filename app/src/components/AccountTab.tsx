import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Globe,
  Smartphone
} from 'lucide-react';

interface AccountTabProps {
  user: { name: string; email: string } | null;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function AccountTab({ user, isLoggedIn, onLogout }: AccountTabProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8">
        <h1 className="text-white mb-4">Account</h1>
        
        {isLoggedIn && user ? (
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-primary">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white">{user.name}</p>
              <p className="text-blue-100 text-sm">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-white text-primary">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white">Guest User</p>
              <p className="text-blue-100 text-sm">Not signed in</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4 -mt-4">
        {/* Profile Section */}
        {isLoggedIn ? (
          <Card className="p-4">
            <h3 className="mb-3 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Edit Profile</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Change Password</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Preferences</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-4 text-center">
            <h3 className="mb-2">Sign in to unlock more features</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get access to cloud sync, community features, and data backup.
            </p>
            <Button className="w-full">
              Sign In / Create Account
            </Button>
          </Card>
        )}

        {/* App Settings */}
        <Card className="p-4">
          <h3 className="mb-3 flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>App Settings</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Auto-sync Data</span>
              </div>
              <Switch defaultChecked={isLoggedIn} disabled={!isLoggedIn} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Share Anonymous Data</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Haptic Feedback</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Data & Privacy */}
        <Card className="p-4">
          <h3 className="mb-3 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Data & Privacy</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Export</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Terms of Service</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-4">
          <h3 className="mb-3 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Help Center</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Contact Support</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Report a Bug</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-4 -border/0">
          <div className="text-center text-sm text-muted-foreground">
            <p>MicroDetect v1.2.0</p>
            <p>© 2025 Environmental Solutions Inc.</p>
          </div>
        </Card>

        {/* Logout Button */}
        {isLoggedIn && (
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}