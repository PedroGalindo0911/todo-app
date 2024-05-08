import React, { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import { tasksData } from './Task';

function App() {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
    setEditingTask(null); // Limpiar la tarea de edición al cerrar el modal
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    console.log('Editing Task:', task); // Verifica si se activa correctamente al editar
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    console.log('Deleting Task ID:', taskId); // Verifica si se activa correctamente al eliminar
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <Header openModal={openModal} filter={filter} setFilter={setFilter} />
      {showModal && (
        <Modal
          closeModal={closeModal}
          handleAddTask={handleAddTask}
          editingTask={editingTask}
        />
      )}
      <TaskList
        tasks={tasks}
        filter={filter}
        handleTaskStatusChange={handleTaskStatusChange}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
