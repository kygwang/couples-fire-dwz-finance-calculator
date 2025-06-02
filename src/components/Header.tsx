import React from 'react';
import { Heart, Users, User, Flame, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { mode, setMode, strategyMode, setStrategyMode } = useAppContext();

  const getTooltipText = () => {
    if (mode === 'single') {
      return strategyMode === 'fire'
        ? "FIRE (Financial Independence, Retire Early) for individuals focuses on aggressive saving and investing to achieve early retirement through passive income."
        : "DWZ (Die With Zero) for individuals optimizes lifetime experiences by balancing saving and spending, aiming to use assets fully during your lifetime.";
    } else {
      return strategyMode === 'fire'
        ? "FIRE for couples enables partners to work together towards financial independence, combining resources and sharing goals for early retirement."
        : "DWZ for couples helps partners optimize their shared experiences and assets, ensuring both enjoy life while working towards leaving minimal unused wealth.";
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-accent-300" />
            <h1 className="text-2xl font-bold tracking-tight">FIRE Calculator</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex items-center bg-primary-700/50 rounded-lg p-1">
              <button
                onClick={() => setMode('single')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  mode === 'single'
                    ? 'bg-white text-primary-800'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium">Single</span>
              </button>
              <button
                onClick={() => setMode('couple')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  mode === 'couple'
                    ? 'bg-white text-primary-800'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium">Couple</span>
              </button>
            </div>

            <div className="flex items-center bg-primary-700/50 rounded-lg p-1">
              <button
                onClick={() => setStrategyMode('fire')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  strategyMode === 'fire'
                    ? 'bg-white text-primary-800'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Flame className="h-4 w-4 mr-2" />
                <span className="font-medium">FIRE</span>
              </button>
              <button
                onClick={() => setStrategyMode('dwz')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  strategyMode === 'dwz'
                    ? 'bg-white text-primary-800'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Target className="h-4 w-4 mr-2" />
                <span className="font-medium">DWZ</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="tooltip">
              <span className="text-sm font-medium cursor-help border-b border-dashed border-white/70">
                About {mode === 'single' ? 'Individual' : 'Couple'} {strategyMode.toUpperCase()}
              </span>
              <span className="tooltip-text w-72">
                {getTooltipText()}
              </span>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-primary-100 max-w-2xl">
          {mode === 'couple' 
            ? strategyMode === 'fire'
              ? "Plan your journey to financial independence together. Calculate your shared retirement goals and have meaningful money conversations."
              : "Optimize your shared lifetime experiences. Balance saving and spending to maximize your life's value as a couple."
            : strategyMode === 'fire'
              ? "Take control of your financial future. Calculate your path to financial independence and early retirement."
              : "Make the most of your life's journey. Balance saving and spending to maximize your experiences and impact."}
        </p>
      </div>
    </header>
  );
};

export default Header;