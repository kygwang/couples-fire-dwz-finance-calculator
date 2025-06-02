import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface FireNumberDisplayProps {
  fireNumber: number;
}

const FireNumberDisplay: React.FC<FireNumberDisplayProps> = ({ fireNumber }) => {
  const [animatedValue, setAnimatedValue] = useState<number>(fireNumber);
  const prevFireNumberRef = useRef<number>(fireNumber);
  
  // Animate the FIRE number when it changes
  useEffect(() => {
    const prevValue = prevFireNumberRef.current;
    if (prevValue !== fireNumber) {
      // Store the current fire number for the next comparison
      prevFireNumberRef.current = fireNumber;
      
      // Start from the previous value
      setAnimatedValue(prevValue);
      
      // Animate to the new value
      const duration = 1000; // Animation duration in ms
      const start = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutQuad for smoother animation
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        
        const currentValue = prevValue + (fireNumber - prevValue) * easeProgress;
        setAnimatedValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [fireNumber]);
  
  return (
    <div className="card bg-gradient-to-br from-primary-50 to-white border border-primary-100">
      <div className="flex items-center space-x-2 mb-3">
        <TrendingUp className="h-5 w-5 text-primary-500" />
        <h2 className="text-xl font-semibold text-primary-900">Your FIRE Number</h2>
      </div>
      
      <div className="text-4xl font-bold text-primary-700 mb-4 transition-all duration-300">
        {formatCurrency(animatedValue)}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-700">Annual Withdrawal (4%)</p>
          <p className="text-xl font-semibold text-primary-600">
            {formatCurrency(fireNumber * 0.04)}
          </p>
          <p className="text-xs text-gray-500 mt-1">per year</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-700">Monthly Withdrawal</p>
          <p className="text-xl font-semibold text-primary-600">
            {formatCurrency(fireNumber * 0.04 / 12)}
          </p>
          <p className="text-xs text-gray-500 mt-1">per month</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-100">
        <div className="flex items-start space-x-2">
          <div className="p-1 bg-accent-100 rounded-full mt-0.5">
            <ArrowRight className="h-3 w-3 text-accent-700" />
          </div>
          <p className="text-sm text-gray-700">
            Based on the 4% rule, this is the amount you need to save to maintain your current 
            lifestyle indefinitely without depleting your principal investment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FireNumberDisplay;