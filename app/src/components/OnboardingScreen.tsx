import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronRight, Microscope, Users, BarChart3 } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Microscope className="w-16 h-16 text-primary" />,
      title: "Advanced Detection",
      description: "Our cutting-edge microplastic detector uses optical analysis to identify and count microplastic particles in water samples with precision."
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-primary" />,
      title: "Real-time Analysis",
      description: "Get instant results with ratings from low to high contamination levels. Track microplastic counts and monitor water quality over time."
    },
    {
      icon: <Users className="w-16 h-16 text-primary" />,
      title: "Community Impact",
      description: "Share your findings to build a comprehensive database. Together, we can map microplastic pollution and drive environmental change."
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto">
        <div className="w-full mb-8">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              {steps[currentStep].icon}
            </div>
            
            <h2 className="mb-4">{steps[currentStep].title}</h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {steps[currentStep].description}
            </p>

            <div className="space-y-3">
              <Button 
                onClick={handleNext}
                className="w-full"
                size="lg"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button 
                  variant="ghost" 
                  onClick={handleSkip}
                  className="w-full"
                >
                  Skip
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}