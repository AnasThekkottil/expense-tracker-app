import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs'; // We'll use this to format dates

const MonthlyBarChart = ({ expenses }) => {
  // Step 1: Aggregate totals per month
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = dayjs(expense.date).format('MMM YYYY'); // eg: Jul 2025
    acc[month] = (acc[month] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // Step 2: Convert to array for Recharts
  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Expenses by Month</h3>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
