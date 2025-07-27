'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrammarLineChartProps {
  data?: Array<{
    session: number;
    accuracy: number;
  }>;
}

export default function GrammarLineChart({ data = [] }: GrammarLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="session" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
            formatter={(value: number) => [`${value}%`, 'Accuracy']}
            labelFormatter={(label: number) => `Session ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke="#F59E0B" 
            strokeWidth={3}
            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}