import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PieChart as PieChartIcon, BarChart3 } from "lucide-react";

function ChartsSection({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="glass-card p-10 text-center section flex flex-col justify-center items-center">
        <PieChartIcon className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-500">
          No data available yet. Add transactions to see analytics.
        </p>
      </div>
    );
  }

  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 };
      }
      acc[curr.category].value += Number(curr.amount);
      return acc;
    }, {})
  );

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const barData = [
    { name: "Income", amount: income, fill: "#10B981" }, // Emerald 500
    { name: "Expense", amount: expense, fill: "#F43F5E" }, // Rose 500
  ];

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#14B8A6", "#F59E0B"];

  return (
    <div className="grid md:grid-cols-2 gap-6 section">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <PieChartIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">
            Category Distribution
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              outerRadius={90}
              innerRadius={60}
              paddingAngle={5}
            >
              {categoryData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">
            Income vs Expense
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Bar
              dataKey="amount"
              radius={[8, 8, 8, 8]}
              barSize={40}
            >
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartsSection;
