import React from 'react';
import { PiggyBank, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

const SavingsDisplay: React.FC = () => {
  const { totalMonthlyIncome, totalMonthlySpend, monthlySavings } = useAppContext();
  
  const savingsRate = totalMonthlyIncome > 0 
    ? (monthlySavings / totalMonthlyIncome) * 100 
    : 0;

  return (
    <div className="card bg-gradient-to-br from-success-50 to-white border border-success-100">
      <div className="flex items-center space-x-2 mb-3">
        <PiggyBank className="h-5 w-5 text-success-500" />
        <h2 className="text-xl font-semibold text-success-900">Monthly Savings</h2>
      </div>
      
      <div className="text-4xl font-bold text-success-700 mb-4">
        {formatCurrency(monthlySavings)}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-700">Savings Rate</p>
          <p className="text-xl font-semibold text-success-600">
            {savingsRate.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">of monthly income</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-700">Annual Savings</p>
          <p className="text-xl font-semibold text-success-600">
            {formatCurrency(monthlySavings * 12)}
          </p>
          <p className="text-xs text-gray-500 mt-1">per year</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-success-50 rounded-lg border border-success-100">
        <div className="flex items-start space-x-2">
          <div className="p-1 bg-success-100 rounded-full mt-0.5">
            <TrendingUp className="h-3 w-3 text-success-700" />
          </div>
          <p className="text-sm text-gray-700">
            A higher savings rate accelerates your journey to financial independence by increasing 
            both your investment capital and reducing your required retirement savings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsDisplay;