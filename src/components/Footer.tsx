import React from 'react';
import { GithubIcon, HeartIcon, InfoIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              The FIRE calculator is a tool to help you plan your financial independence journey.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="tooltip">
              <span className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors cursor-help">
                <InfoIcon className="h-4 w-4 mr-1" />
                <span>Disclaimer</span>
              </span>
              <span className="tooltip-text w-64">
                This calculator provides estimates based on the 4% rule. Individual financial situations vary, 
                and you should consult with a financial advisor for personalized advice.
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span className="flex items-center">
                <HeartIcon className="h-4 w-4 text-accent-500 mr-1" />
                <span>Made with care</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;