import React, { useState } from 'react';
import { PlusCircle, X, Edit2, Save } from 'lucide-react';
import { useAppContext, CustomExpense } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

const CustomExpenses: React.FC = () => {
  const { customExpenses, addCustomExpense, removeCustomExpense, updateCustomExpense } = useAppContext();
  
  const [newExpenseName, setNewExpenseName] = useState<string>('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editAmount, setEditAmount] = useState<string>('');
  
  // Add new expense
  const handleAddExpense = () => {
    if (newExpenseName.trim() && parseFloat(newExpenseAmount) > 0) {
      const newExpense: CustomExpense = {
        id: Date.now().toString(),
        name: newExpenseName.trim(),
        amount: parseFloat(newExpenseAmount),
      };
      
      addCustomExpense(newExpense);
      setNewExpenseName('');
      setNewExpenseAmount('');
    }
  };
  
  // Start editing an expense
  const handleStartEdit = (expense: CustomExpense) => {
    setEditingId(expense.id);
    setEditName(expense.name);
    setEditAmount(expense.amount.toString());
  };
  
  // Save edited expense
  const handleSaveEdit = (id: string) => {
    if (editName.trim() && parseFloat(editAmount) > 0) {
      updateCustomExpense({
        id,
        name: editName.trim(),
        amount: parseFloat(editAmount),
      });
      setEditingId(null);
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Add one-time expenses for major life events like education, weddings, or other financial goals.
      </p>
      
      {/* Add new expense form */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newExpenseName}
          onChange={(e) => setNewExpenseName(e.target.value)}
          placeholder="Expense name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <div className="relative flex-shrink-0 sm:w-32">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">$</span>
          <input
            type="number"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            placeholder="Amount"
            min="0"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <button
          onClick={handleAddExpense}
          disabled={!newExpenseName.trim() || !newExpenseAmount || parseFloat(newExpenseAmount) <= 0}
          className="flex-shrink-0 flex items-center justify-center gap-1 px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors duration-200"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>
      
      {/* List of expenses */}
      {customExpenses.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {customExpenses.map((expense) => (
            <li
              key={expense.id}
              className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center animate-fade-in"
            >
              {editingId === expense.id ? (
                // Edit mode
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <div className="relative w-24">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">$</span>
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <button
                    onClick={() => handleSaveEdit(expense.id)}
                    className="p-1 text-success-600 hover:text-success-700"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                // Display mode
                <>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">{expense.name}</span>
                    <span className="ml-2 text-primary-600 font-semibold">{formatCurrency(expense.amount)}</span>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleStartEdit(expense)}
                      className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeCustomExpense(expense.id)}
                      className="p-1 text-gray-500 hover:text-error-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic mt-2">No custom expenses added yet.</p>
      )}
      
      {customExpenses.length > 0 && (
        <div className="mt-4 pt-2 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Total One-time Expenses:</span>
            <span className="text-lg font-semibold text-primary-700">
              {formatCurrency(customExpenses.reduce((sum, expense) => sum + expense.amount, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomExpenses;