import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit2, Trash2, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isOverdue =
    task.status !== 'Completed' &&
    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  const priorityColors = {
    Low: 'bg-gray-100 text-gray-600 border-gray-200',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    High: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const statusColors = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-200',
    Completed: 'bg-green-50 text-green-600 border-green-200',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-xl p-5 border shadow-sm transition-all group ${
        isOverdue ? 'border-red-200 shadow-red-50' : 'border-gray-100'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight pr-4">
          {task.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        <span
          className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
        <span
          className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority} Priority
        </span>

        <div
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border font-medium ${
            isOverdue
              ? 'bg-red-50 text-red-600 border-red-200'
              : 'bg-gray-50 text-gray-600 border-gray-200'
          }`}
        >
          {isOverdue ? <AlertCircle size={12} /> : <Calendar size={12} />}
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
