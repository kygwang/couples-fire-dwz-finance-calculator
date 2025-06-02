import React, { useState } from 'react';
import { DollarSign, Plus, X, Edit2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

const MonthlySpendSlider: React.FC = () => {
  const { 
    monthlyExpenses,
    addMonthlyExpense,
    removeMonthlyExpense,
    updateMonthlyExpense,
    toggleMonthlyExpense,
    totalMonthlySpend,
    yearlySpend
  } = useAppContext();

  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddExpense = () => {
    if (newExpenseName && parseFloat(newExpenseAmount) > 0) {
      addMonthlyExpense({
        id: Date.now().toString(),
        name: newExpenseName.trim(),
        amount: parseFloat(newExpenseAmount),
        enabled: true
      });
      setNewExpenseName('');
      setNewExpenseAmount('');
    }
  };

  const handleUpdateAmount = (id: string, amount: string) => {
    const expense = monthlyExpenses.find(e => e.id === id);
    if (expense && !isNaN(parseFloat(amount))) {
      updateMonthlyExpense({
        ...expense,
        amount: parseFloat(amount)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-primary-500 mr-1" />
          <span className="text-sm text-gray-700">Monthly Expenses</span>
        </div>
        <div className="text-2xl font-semibold text-primary-700">
          {formatCurrency(totalMonthlySpend)}
        </div>
      </div>

      <div className="space-y-4">
        {monthlyExpenses.map(expense => (
          <div key={expense.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              checked={expense.enabled}
              onChange={() => toggleMonthlyExpense(expense.id)}
              className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <div className="flex-grow">
              <input
                type="text"
                value={expense.name}
                onChange={(e) => updateMonthlyExpense({ ...expense, name: e.target.value })}
                className="bg-transparent border-none p-0 font-medium text-gray-700 focus:ring-0 w-full"
              />
            </div>
            <div className="relative w-32">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
                $
              </span>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => handleUpdateAmount(expense.id, e.target.value)}
                className="pl-6 pr-2 py-1 w-full border border-gray-300 rounded text-right"
              />
            </div>
            <button
              onClick={() => removeMonthlyExpense(expense.id)}
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
          value={newExpenseName}
          onChange={(e) => setNewExpenseName(e.target.value)}
          placeholder="New expense category"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <div className="relative w-32">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            $
          </span>
          <input
            type="number"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            placeholder="Amount"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleAddExpense}
          disabled={!newExpenseName || !newExpenseAmount}
          className="flex items-center gap-1 px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Annual Expenses:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(yearlySpend)}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlySpendSlider;