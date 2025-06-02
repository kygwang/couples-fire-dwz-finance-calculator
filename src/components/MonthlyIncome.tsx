import React, { useState } from 'react';
import { DollarSign, Plus, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

const MonthlyIncome: React.FC = () => {
  const { 
    monthlyIncomes,
    addMonthlyIncome,
    removeMonthlyIncome,
    updateMonthlyIncome,
    toggleMonthlyIncome,
    totalMonthlyIncome
  } = useAppContext();

  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');

  const handleAddIncome = () => {
    if (newIncomeSource && parseFloat(newIncomeAmount) > 0) {
      addMonthlyIncome({
        id: Date.now().toString(),
        source: newIncomeSource.trim(),
        amount: parseFloat(newIncomeAmount),
        enabled: true
      });
      setNewIncomeSource('');
      setNewIncomeAmount('');
    }
  };

  const handleUpdateAmount = (id: string, amount: string) => {
    const income = monthlyIncomes.find(i => i.id === id);
    if (income && !isNaN(parseFloat(amount))) {
      updateMonthlyIncome({
        ...income,
        amount: parseFloat(amount)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-success-500 mr-1" />
          <span className="text-sm text-gray-700">Monthly Income Sources</span>
        </div>
        <div className="text-2xl font-semibold text-success-700">
          {formatCurrency(totalMonthlyIncome)}
        </div>
      </div>

      <div className="space-y-4">
        {monthlyIncomes.map(income => (
          <div key={income.id} className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <input
              type="checkbox"
              checked={income.enabled}
              onChange={() => toggleMonthlyIncome(income.id)}
              className="h-4 w-4 text-success-600 rounded border-gray-300 focus:ring-success-500"
            />
            <div className="flex-grow">
              <input
                type="text"
                value={income.source}
                onChange={(e) => updateMonthlyIncome({ ...income, source: e.target.value })}
                className="bg-transparent border-none p-0 font-medium text-gray-700 focus:ring-0 w-full"
              />
            </div>
            <div className="relative w-32">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
                $
              </span>
              <input
                type="number"
                value={income.amount}
                onChange={(e) => handleUpdateAmount(income.id, e.target.value)}
                className="pl-6 pr-2 py-1 w-full border border-gray-300 rounded text-right"
              />
            </div>
            <button
              onClick={() => removeMonthlyIncome(income.id)}
              className="text-gray-400 hover:text-error-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newIncomeSource}
          onChange={(e) => setNewIncomeSource(e.target.value)}
          placeholder="New income source"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <div className="relative w-32">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            $
          </span>
          <input
            type="number"
            value={newIncomeAmount}
            onChange={(e) => setNewIncomeAmount(e.target.value)}
            placeholder="Amount"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleAddIncome}
          disabled={!newIncomeSource || !newIncomeAmount}
          className="flex items-center gap-1 px-4 py-2 bg-success-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-success-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Annual Income:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(totalMonthlyIncome * 12)}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncome;