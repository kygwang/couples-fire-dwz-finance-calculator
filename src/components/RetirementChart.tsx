import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface RetirementChartProps {
  monthlySpend: number;
  fireNumber: number;
}

const RetirementChart: React.FC<RetirementChartProps> = ({ monthlySpend, fireNumber }) => {
  // Generate data for the chart
  const chartData = useMemo(() => {
    const baseMonthlySpend = 1000; // Starting point for the chart
    const maxMonthlySpend = 20000; // Maximum value for the chart
    const step = 1000; // Step size between data points
    
    const data = [];
    
    for (let spend = baseMonthlySpend; spend <= maxMonthlySpend; spend += step) {
      const yearlySpend = spend * 12;
      const fireAmount = yearlySpend * 25;
      
      data.push({
        monthlySpend: spend,
        fireAmount,
      });
    }
    
    return data;
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            Monthly Spending: {formatCurrency(data.monthlySpend)}
          </p>
          <p className="text-sm font-medium text-primary-700">
            Required Savings: {formatCurrency(data.fireAmount)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Based on the 4% rule
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="monthlySpend" 
            tickFormatter={(value) => `$${value/1000}k`}
            label={{ 
              value: 'Monthly Spending', 
              position: 'insideBottom', 
              offset: -15,
              style: { fontSize: '0.75rem', fill: '#6b7280' }
            }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value/1000000}M`}
            label={{ 
              value: 'FIRE Number', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: '0.75rem', fill: '#6b7280' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="fireAmount" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
          />
          
          {/* Reference line for current monthly spend */}
          <ReferenceLine 
            x={monthlySpend} 
            stroke="#f97316" 
            strokeDasharray="5 5"
            label={{ 
              value: 'Current', 
              position: 'top', 
              fill: '#f97316',
              fontSize: 12
            }}
          />
          
          {/* Reference line for FIRE number */}
          <ReferenceLine 
            y={fireNumber} 
            stroke="#14b8a6" 
            strokeDasharray="5 5"
            label={{ 
              value: 'Your FIRE Goal', 
              position: 'right', 
              fill: '#14b8a6',
              fontSize: 12
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetirementChart;