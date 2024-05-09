import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Estado para la tarea en edición

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

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/todos/tasks/${taskId}/`, { status: newStatus });
      fetchTasks(); // Actualizar la lista de tareas después de la actualización
    } catch (error) {
      console.error('Error updating task:', error);
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
      fetchTasks(); // Actualizar la lista de tareas después de la eliminación
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null); // Limpiar la tarea en edición al cerrar el modal
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
        handleEditTask={openModalForEdit} // Abrir modal para editar al hacer clic en editar
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
