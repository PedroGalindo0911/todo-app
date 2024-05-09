import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await axios.post('http://localhost:8000/todos/tasks/', newTask);
      fetchTasks();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:8000/todos/tasks/${updatedTask.id}/`, updatedTask);
      fetchTasks();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const openModalForEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const openModalForAdd = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/todos/tasks/${taskId}/`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <Header openModal={openModalForAdd} filter={filter} setFilter={setFilter} />
      {showModal && (
        <Modal
          closeModal={closeModal}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          editingTask={editingTask}
        />
      )}
      <TaskList
        tasks={tasks}
        filter={filter}
        openAddModal={openModalForAdd}
        handleEditTask={openModalForEdit} 
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
