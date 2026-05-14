import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import * as api from '../services/api';
import TaskStats from '../components/TaskStats';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { data } = await api.createTask(taskData);
      setTasks([data, ...tasks]);
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to create task');
      console.error(err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const { data } = await api.updateTask(editingTask._id, taskData);
      setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      alert('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(id);
        setTasks(tasks.filter((t) => t._id !== id));
      } catch (err) {
        alert('Failed to delete task');
        console.error(err);
      }
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Track your progress and upcoming deadlines.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm shadow-blue-600/20 transition-all active:scale-95 font-medium"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p>{error}</p>
        </div>
      ) : (
        <>
          <TaskStats tasks={tasks} />

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative flex items-center">
                <Filter className="absolute left-3 text-gray-400" size={16} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none min-w-[140px]"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="relative flex items-center">
                <Filter className="absolute left-3 text-gray-400" size={16} />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none min-w-[140px]"
                >
                  <option value="All">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={openEditModal}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
             <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                 <Search className="text-gray-400" size={24} />
               </div>
               <h3 className="text-lg font-medium text-gray-800 mb-1">No tasks found</h3>
               <p className="text-gray-500">
                 {tasks.length === 0 
                   ? "You haven't added any tasks yet. Create one to get started!" 
                   : "No tasks match your current filters."}
               </p>
               {tasks.length === 0 && (
                 <button
                   onClick={() => setIsModalOpen(true)}
                   className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                 >
                   Create First Task
                 </button>
               )}
             </div>
          )}
        </>
      )}

      <TaskForm
        isOpen={isModalOpen}
        onClose={closeForm}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        editingTask={editingTask}
      />
    </motion.div>
  );
};

export default Dashboard;
