import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { useAppContext } from '../context/AppContext';
import { TrendingUp } from 'lucide-react';

const NetWorthChart: React.FC = () => {
  const { getNetWorthProjection, calculateFireNumber, economicFactors } = useAppContext();
  const projectionData = getNetWorthProjection();
  const fireNumber = calculateFireNumber();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            Age: {label}
          </p>
          <p className="text-sm font-medium text-primary-700">
            Net Worth: {formatCurrency(payload[0].value)}
          </p>
          {payload[0].value >= fireNumber && (
            <p className="text-xs text-success-600 mt-1">
              FIRE Goal Achieved! 🎉
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-800">Net Worth Projection</h2>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={projectionData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="age"
              label={{
                value: 'Age',
                position: 'insideBottom',
                offset: -10,
                style: { fontSize: '0.75rem', fill: '#6b7280' }
              }}
            />
            <YAxis
              tickFormatter={(value) => `$${value/1000000}M`}
              label={{
                value: 'Net Worth',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fontSize: '0.75rem', fill: '#6b7280' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="netWorth"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
            <ReferenceLine
              y={fireNumber}
              stroke="#22c55e"
              strokeDasharray="3 3"
              label={{
                value: 'FIRE Goal',
                position: 'right',
                fill: '#22c55e',
                fontSize: 12
              }}
            />
            <ReferenceLine
              x={economicFactors.idealRetirementAge}
              stroke="#f97316"
              strokeDasharray="3 3"
              label={{
                value: 'Ideal Retirement',
                position: 'top',
                fill: '#f97316',
                fontSize: 12
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          This projection shows your estimated net worth growth based on your current savings rate
          and investment assumptions. The green line represents your FIRE number goal.
        </p>
      </div>
    </div>
  );
};

export default NetWorthChart;