import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TimelineTab } from './TimelineTab';
import { DeviceHealthTab } from './DeviceHealthTab';
import { AccountTab } from './AccountTab';
import { Home, Activity, User } from 'lucide-react';

interface MainAppProps {
  user: { name: string; email: string } | null;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function MainApp({ user, isLoggedIn, onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="pb-20">
          <TabsContent value="timeline" className="mt-0 h-full">
            <TimelineTab isLoggedIn={isLoggedIn} />
          </TabsContent>
          
          <TabsContent value="device" className="mt-0 h-full">
            <DeviceHealthTab />
          </TabsContent>
          
          <TabsContent value="account" className="mt-0 h-full">
            <AccountTab user={user} isLoggedIn={isLoggedIn} onLogout={onLogout} />
          </TabsContent>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <TabsList className="grid w-full grid-cols-3 h-16 bg-transparent">
            <TabsTrigger 
              value="timeline" 
              className="flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-accent"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Timeline</span>
            </TabsTrigger>
            <TabsTrigger 
              value="device" 
              className="flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-accent"
            >
              <Activity className="w-5 h-5" />
              <span className="text-xs">Device</span>
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-accent"
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Account</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}