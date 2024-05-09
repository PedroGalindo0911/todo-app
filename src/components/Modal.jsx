import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ closeModal, handleAddTask, handleEditTask, editingTask }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: title,
      status: status,
      date: new Date().toISOString(),
    };

    try {
      if (editingTask) {
        // Si estamos editando una tarea existente
        const updatedTask = {
          ...editingTask,
          title: title,
          status: status,
        };
        await handleEditTask(updatedTask);
      } else {
        // Si estamos agregando una nueva tarea
        await handleAddTask(taskData);
      }

      closeModal(); // Cierra el modal después de agregar o editar
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label className="titleform" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            autoFocus
          />
          <label className="titleform" htmlFor="status">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          <div className="button-container">
            <button className="submit-btn btn" type="submit">
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
            <button className="cancel-btn btn" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
