import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const overdue = tasks.filter(
    (t) => t.status !== 'Completed' && new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
  ).length;

  const stats = [
    { label: 'Total Tasks', value: total, icon: <LayoutDashboard size={20} />, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { label: 'Pending', value: pending, icon: <Clock size={20} />, color: 'bg-orange-50 text-orange-600', border: 'border-orange-100' },
    { label: 'Completed', value: completed, icon: <CheckCircle2 size={20} />, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
    { label: 'Overdue', value: overdue, icon: <AlertCircle size={20} />, color: 'bg-red-50 text-red-600', border: 'border-red-100' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`bg-white rounded-xl p-4 border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <h3 className="text-gray-500 font-medium text-sm">{stat.label}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800 ml-1">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskStats;
