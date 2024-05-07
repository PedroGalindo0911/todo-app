import React, { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { tasksData } from './Task';

function App() {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };

  return (
    <div className="app">
      <Header openModal={openModal} filter={filter} setFilter={setFilter} />
      {showModal && (
        <Modal closeModal={closeModal} handleAddTask={handleAddTask} />
      )}
      <TaskList
        tasks={tasks}
        filter={filter}
        handleTaskStatusChange={handleTaskStatusChange}
      />
    </div>
  );
}

export default App;
