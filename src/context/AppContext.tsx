import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MonthlyIncome {
  id: string;
  source: string;
  amount: number;
  enabled: boolean;
}

export interface MonthlyExpense {
  id: string;
  name: string;
  amount: number;
  enabled: boolean;
}

export interface CustomExpense {
  id: string;
  name: string;
  amount: number;
}

interface EconomicFactors {
  inflation: number;
  debasement: number;
  investmentReturn: number;
  currentNetWorth: number;
  withdrawalRate: number;
  idealRetirementAge: number;
  currentAge: number;
}

type CalculatorMode = 'single' | 'couple';
type StrategyMode = 'fire' | 'dwz';

interface AppContextType {
  monthlyIncomes: MonthlyIncome[];
  addMonthlyIncome: (income: MonthlyIncome) => void;
  removeMonthlyIncome: (id: string) => void;
  updateMonthlyIncome: (income: MonthlyIncome) => void;
  toggleMonthlyIncome: (id: string) => void;
  monthlyExpenses: MonthlyExpense[];
  addMonthlyExpense: (expense: MonthlyExpense) => void;
  removeMonthlyExpense: (id: string) => void;
  updateMonthlyExpense: (expense: MonthlyExpense) => void;
  toggleMonthlyExpense: (id: string) => void;
  customExpenses: CustomExpense[];
  addCustomExpense: (expense: CustomExpense) => void;
  removeCustomExpense: (id: string) => void;
  updateCustomExpense: (expense: CustomExpense) => void;
  calculateFireNumber: () => number;
  calculateTimeToFire: () => number;
  getNetWorthProjection: () => Array<{ age: number; netWorth: number }>;
  totalMonthlyIncome: number;
  totalMonthlySpend: number;
  monthlySavings: number;
  yearlySpend: number;
  totalCustomExpenses: number;
  economicFactors: EconomicFactors;
  setEconomicFactors: (factors: EconomicFactors) => void;
  mode: CalculatorMode;
  setMode: (mode: CalculatorMode) => void;
  strategyMode: StrategyMode;
  setStrategyMode: (mode: StrategyMode) => void;
  workingYears: number;
}

const AppContext = createContext<AppContextType>({
  monthlyIncomes: [],
  addMonthlyIncome: () => {},
  removeMonthlyIncome: () => {},
  updateMonthlyIncome: () => {},
  toggleMonthlyIncome: () => {},
  monthlyExpenses: [],
  addMonthlyExpense: () => {},
  removeMonthlyExpense: () => {},
  updateMonthlyExpense: () => {},
  toggleMonthlyExpense: () => {},
  customExpenses: [],
  addCustomExpense: () => {},
  removeCustomExpense: () => {},
  updateCustomExpense: () => {},
  calculateFireNumber: () => 0,
  calculateTimeToFire: () => 0,
  getNetWorthProjection: () => [],
  totalMonthlyIncome: 0,
  totalMonthlySpend: 0,
  monthlySavings: 0,
  yearlySpend: 0,
  totalCustomExpenses: 0,
  economicFactors: {
    inflation: 2,
    debasement: 1,
    investmentReturn: 7,
    currentNetWorth: 0,
    withdrawalRate: 4,
    idealRetirementAge: 65,
    currentAge: 21
  },
  setEconomicFactors: () => {},
  mode: 'single',
  setMode: () => {},
  strategyMode: 'fire',
  setStrategyMode: () => {},
  workingYears: 0,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<CalculatorMode>(() => {
    const saved = localStorage.getItem('calculatorMode');
    return (saved as CalculatorMode) || 'single';
  });

  const [strategyMode, setStrategyMode] = useState<StrategyMode>(() => {
    const saved = localStorage.getItem('strategyMode');
    return (saved as StrategyMode) || 'fire';
  });

  const [monthlyIncomes, setMonthlyIncomes] = useState<MonthlyIncome[]>(() => {
    const saved = localStorage.getItem('monthlyIncomes');
    return saved ? JSON.parse(saved) : [
      { id: '1', source: 'Primary Job', amount: 5000, enabled: true },
      { id: '2', source: 'Side Hustle', amount: 1000, enabled: true },
    ];
  });

  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>(() => {
    const saved = localStorage.getItem('monthlyExpenses');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Housing', amount: 2000, enabled: true },
      { id: '2', name: 'Food', amount: 600, enabled: true },
      { id: '3', name: 'Transportation', amount: 400, enabled: true },
      { id: '4', name: 'Healthcare', amount: 300, enabled: true },
      { id: '5', name: 'Entertainment', amount: 200, enabled: true },
    ];
  });

  const [customExpenses, setCustomExpenses] = useState<CustomExpense[]>(() => {
    const saved = localStorage.getItem('customExpenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [economicFactors, setEconomicFactors] = useState<EconomicFactors>(() => {
    const saved = localStorage.getItem('economicFactors');
    return saved ? JSON.parse(saved) : {
      inflation: 2,
      debasement: 1,
      investmentReturn: 7,
      currentNetWorth: 0,
      withdrawalRate: 4,
      idealRetirementAge: 65,
      currentAge: 21
    };
  });

  useEffect(() => {
    localStorage.setItem('calculatorMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('strategyMode', strategyMode);
  }, [strategyMode]);

  useEffect(() => {
    localStorage.setItem('monthlyIncomes', JSON.stringify(monthlyIncomes));
  }, [monthlyIncomes]);

  useEffect(() => {
    localStorage.setItem('monthlyExpenses', JSON.stringify(monthlyExpenses));
  }, [monthlyExpenses]);

  useEffect(() => {
    localStorage.setItem('customExpenses', JSON.stringify(customExpenses));
  }, [customExpenses]);

  useEffect(() => {
    localStorage.setItem('economicFactors', JSON.stringify(economicFactors));
  }, [economicFactors]);

  const totalMonthlyIncome = monthlyIncomes
    .filter(income => income.enabled)
    .reduce((sum, income) => sum + income.amount, 0);

  const totalMonthlySpend = monthlyExpenses
    .filter(expense => expense.enabled)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthlySavings = totalMonthlyIncome - totalMonthlySpend;
  const yearlySpend = totalMonthlySpend * 12;
  const yearlySavings = monthlySavings * 12;

  const workingYears = economicFactors.idealRetirementAge - economicFactors.currentAge;

  const totalCustomExpenses = customExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const addMonthlyIncome = (income: MonthlyIncome) => {
    setMonthlyIncomes(prev => [...prev, income]);
  };

  const removeMonthlyIncome = (id: string) => {
    setMonthlyIncomes(prev => prev.filter(income => income.id !== id));
  };

  const updateMonthlyIncome = (updatedIncome: MonthlyIncome) => {
    setMonthlyIncomes(prev =>
      prev.map(income =>
        income.id === updatedIncome.id ? updatedIncome : income
      )
    );
  };

  const toggleMonthlyIncome = (id: string) => {
    setMonthlyIncomes(prev =>
      prev.map(income =>
        income.id === id ? { ...income, enabled: !income.enabled } : income
      )
    );
  };

  const addMonthlyExpense = (expense: MonthlyExpense) => {
    setMonthlyExpenses(prev => [...prev, expense]);
  };

  const removeMonthlyExpense = (id: string) => {
    setMonthlyExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateMonthlyExpense = (updatedExpense: MonthlyExpense) => {
    setMonthlyExpenses(prev =>
      prev.map(expense =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const toggleMonthlyExpense = (id: string) => {
    setMonthlyExpenses(prev =>
      prev.map(expense =>
        expense.id === id ? { ...expense, enabled: !expense.enabled } : expense
      )
    );
  };

  const addCustomExpense = (expense: CustomExpense) => {
    setCustomExpenses(prev => [...prev, expense]);
  };

  const removeCustomExpense = (id: string) => {
    setCustomExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateCustomExpense = (updatedExpense: CustomExpense) => {
    setCustomExpenses(prev =>
      prev.map(expense =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const calculateFireNumber = (): number => {
    const { withdrawalRate } = economicFactors;
    const multiplier = 100 / withdrawalRate;
    const baseFireNumber = yearlySpend * multiplier;
    return baseFireNumber + totalCustomExpenses;
  };

  const calculateTimeToFire = (): number => {
    const { currentNetWorth, investmentReturn } = economicFactors;
    const fireNumber = calculateFireNumber();
    const monthlyReturn = (investmentReturn / 100) / 12;
    
    let currentBalance = currentNetWorth;
    let months = 0;
    
    while (currentBalance < fireNumber && months < 600) { // Max 50 years
      currentBalance = currentBalance * (1 + monthlyReturn) + monthlySavings;
      months++;
    }
    
    return months / 12; // Convert to years
  };

  const getNetWorthProjection = () => {
    const { currentNetWorth, currentAge, investmentReturn } = economicFactors;
    const monthlyReturn = (investmentReturn / 100) / 12;
    const fireNumber = calculateFireNumber();
    
    let currentBalance = currentNetWorth;
    let projectionData = [{ age: currentAge, netWorth: currentBalance }];
    
    for (let year = 1; year <= 50; year++) {
      for (let month = 0; month < 12; month++) {
        currentBalance = currentBalance * (1 + monthlyReturn) + monthlySavings;
      }
      
      if (currentBalance >= fireNumber * 2) break; // Stop if we've well exceeded the FIRE number
      
      projectionData.push({
        age: currentAge + year,
        netWorth: currentBalance
      });
    }
    
    return projectionData;
  };

  const value = {
    monthlyIncomes,
    addMonthlyIncome,
    removeMonthlyIncome,
    updateMonthlyIncome,
    toggleMonthlyIncome,
    monthlyExpenses,
    addMonthlyExpense,
    removeMonthlyExpense,
    updateMonthlyExpense,
    toggleMonthlyExpense,
    customExpenses,
    addCustomExpense,
    removeCustomExpense,
    updateCustomExpense,
    calculateFireNumber,
    calculateTimeToFire,
    getNetWorthProjection,
    totalMonthlyIncome,
    totalMonthlySpend,
    monthlySavings,
    yearlySpend,
    totalCustomExpenses,
    economicFactors,
    setEconomicFactors,
    mode,
    setMode,
    strategyMode,
    setStrategyMode,
    workingYears,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};