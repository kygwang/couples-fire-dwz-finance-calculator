import React from 'react';
import MonthlyIncome from './MonthlyIncome';
import MonthlySpendSlider from './MonthlySpendSlider';
import CustomExpenses from './CustomExpenses';
import RetirementChart from './RetirementChart';
import NetWorthChart from './NetWorthChart';
import FireNumberDisplay from './FireNumberDisplay';
import SavingsDisplay from './SavingsDisplay';
import EconomicFactors from './EconomicFactors';
import CouplesGuide from './CouplesGuide';
import MoneyGuide from './MoneyGuide';
import { useAppContext } from '../context/AppContext';

const Calculator: React.FC = () => {
  const { totalMonthlySpend, calculateFireNumber, mode, strategyMode } = useAppContext();
  
  const fireNumber = calculateFireNumber();

  return (
    <div className="flex flex-col gap-8 py-4 animate-fade-in">
      {/* Main Calculator Section - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {mode === 'couple' ? 'Combined Monthly Income' : 'Monthly Income'}
            </h2>
            <MonthlyIncome />
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {mode === 'couple' ? 'Shared Monthly Expenses' : 'Monthly Expenses'}
            </h2>
            <MonthlySpendSlider />
          </div>
          
          <SavingsDisplay />
        </div>
        
        <div className="flex flex-col space-y-6">
          <FireNumberDisplay fireNumber={fireNumber} />
          
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Retirement Visualization</h2>
            <RetirementChart monthlySpend={totalMonthlySpend} fireNumber={fireNumber} />
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Future Life Events</h2>
            <CustomExpenses />
          </div>
        </div>
      </div>

      {/* Economic Factors and Net Worth Projection */}
      <div className="space-y-6">
        <EconomicFactors />
        {strategyMode === 'dwz' && <NetWorthChart />}
      </div>

      {/* Money Guide Section - Full Width */}
      <div className="w-full max-w-4xl mx-auto">
        {mode === 'couple' ? <CouplesGuide /> : <MoneyGuide />}
      </div>
    </div>
  );
};

export default Calculator;