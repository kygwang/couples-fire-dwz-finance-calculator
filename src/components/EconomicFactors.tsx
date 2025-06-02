import React from 'react';
import { TrendingUp, Percent, DollarSign, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

const EconomicFactors: React.FC = () => {
  const { economicFactors, setEconomicFactors, calculateTimeToFire, strategyMode } = useAppContext();

  const handleChange = (factor: keyof typeof economicFactors, value: string) => {
    const numValue = parseFloat(value);
    setEconomicFactors({
      ...economicFactors,
      [factor]: isNaN(numValue) ? 0 : numValue
    });
  };

  const timeToFire = calculateTimeToFire();
  const fireAge = economicFactors.currentAge + timeToFire;

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-800">Economic Assumptions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strategyMode === 'dwz' && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Net Worth
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </span>
                <input
                  type="number"
                  value={economicFactors.currentNetWorth}
                  onChange={(e) => handleChange('currentNetWorth', e.target.value)}
                  min="0"
                  step="1000"
                  className="block w-full pl-9 pr-3 py-2 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={economicFactors.currentAge}
                  onChange={(e) => handleChange('currentAge', e.target.value)}
                  min="18"
                  max="100"
                  className="block w-full pr-8 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ideal Retirement Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={economicFactors.idealRetirementAge}
                  onChange={(e) => handleChange('idealRetirementAge', e.target.value)}
                  min={economicFactors.currentAge}
                  max="100"
                  className="block w-full pr-8 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Expected Inflation Rate
          </label>
          <div className="relative">
            <input
              type="number"
              value={economicFactors.inflation}
              onChange={(e) => handleChange('inflation', e.target.value)}
              min="0"
              max="20"
              step="0.1"
              className="block w-full pr-8 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Percent className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Currency Debasement
          </label>
          <div className="relative">
            <input
              type="number"
              value={economicFactors.debasement}
              onChange={(e) => handleChange('debasement', e.target.value)}
              min="0"
              max="10"
              step="0.1"
              className="block w-full pr-8 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Percent className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Expected Investment Return
          </label>
          <div className="relative">
            <input
              type="number"
              value={economicFactors.investmentReturn}
              onChange={(e) => handleChange('investmentReturn', e.target.value)}
              min="0"
              max="20"
              step="0.1"
              className="block w-full pr-8 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Percent className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {strategyMode === 'dwz' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Withdrawal Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={economicFactors.withdrawalRate}
                onChange={(e) => handleChange('withdrawalRate', e.target.value)}
                min="0"
                max="10"
                step="0.1"
                className="block w-full pr-8 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Percent className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
          <p className="text-sm text-gray-600">
            Real Return Rate: {(economicFactors.investmentReturn - economicFactors.inflation - economicFactors.debasement).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            This affects your safe withdrawal rate and final FIRE number
          </p>
        </div>

        {strategyMode === 'dwz' && (
          <div className="p-4 bg-success-50 rounded-lg border border-success-100">
            <p className="text-sm text-gray-600">
              Estimated FIRE Age: {fireAge.toFixed(1)} years old
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Based on current savings rate and investment returns
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EconomicFactors;