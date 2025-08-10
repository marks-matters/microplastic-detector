import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus, Camera, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TimelineTabProps {
  isLoggedIn: boolean;
}

interface Measurement {
  id: string;
  date: string;
  time: string;
  location: string;
  rating: 'low' | 'medium' | 'high';
  count: number;
  description?: string;
  tags: string[];
  image?: string;
}

export function TimelineTab({ isLoggedIn }: TimelineTabProps) {
  const [measurements] = useState<Measurement[]>([
    {
      id: '1',
      date: 'Today',
      time: '2:30 PM',
      location: 'Lake Michigan, Chicago',
      rating: 'medium',
      count: 47,
      description: 'Collected near the shoreline after storm runoff',
      tags: ['storm', 'shoreline', 'urban'],
      image: 'lake water sample'
    },
    {
      id: '2',
      date: 'Yesterday',
      time: '10:15 AM',
      location: 'Hudson River, NYC',
      rating: 'high',
      count: 83,
      description: 'High concentration near industrial area',
      tags: ['industrial', 'pollution'],
      image: 'river water test'
    },
    {
      id: '3',
      date: '2 days ago',
      time: '4:45 PM',
      location: 'Puget Sound, Seattle',
      rating: 'low',
      count: 12,
      description: 'Clean sample from protected bay area',
      tags: ['protected', 'clean'],
    },
    {
      id: '4',
      date: '3 days ago',
      time: '11:30 AM',
      location: 'San Francisco Bay',
      rating: 'medium',
      count: 56,
      description: 'Mixed reading from marina area',
      tags: ['marina', 'recreational'],
    }
  ]);

  const getRatingVariant = (rating: string) => {
    switch (rating) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8">
        <h1 className="text-white mb-2">MicroDetect Timeline</h1>
        <p className="text-teal-100 text-sm">
          {isLoggedIn 
            ? 'Your measurements are contributing to our community database'
            : 'Sign in to share your data with the community'
          }
        </p>
      </div>

      {/* New Measurement Button */}
      <div className="p-4 m-[0px]">
        <Button className="w-full bg-primary text-primary-foreground border border-primary/20 shadow-sm hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Start New Measurement
        </Button>
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-4">
        {measurements.map((measurement, index) => (
          <Card key={measurement.id} className="p-4 border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{measurement.date}</span>
                <span className="text-sm text-muted-foreground">{measurement.time}</span>
              </div>
              <Badge variant={getRatingVariant(measurement.rating)}>
                {measurement.rating.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{measurement.location}</span>
            </div>

            <div className="mb-3">
              <span className="text-lg">{measurement.count} particles</span>
              <span className="text-muted-foreground text-sm ml-2">detected</span>
            </div>

            {measurement.image && (
              <div className="mb-3">
                <ImageWithFallback
                  src={undefined} // Placeholder for image source
                  alt={measurement.image}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            )}

            {measurement.description && (
              <p className="text-sm text-muted-foreground mb-3">{measurement.description}</p>
            )}

            <div className="flex flex-wrap gap-2">
              {measurement.tags.map((tag) => (
                <Badge key={tag} variant="muted" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}