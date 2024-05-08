import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ closeModal, handleAddTask, editingTask }) {
  const initialTitle = editingTask ? editingTask.title : '';
  const initialStatus = editingTask ? editingTask.status : 'incomplete';

  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState(initialStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Please enter a task title.');
      return;
    }

    const newTask = {
      id: editingTask ? editingTask.id : Math.floor(Math.random() * 1000) + 1,
      title: title,
      status: status,
      date: editingTask ? editingTask.date : new Date().toLocaleString(),
    };

    handleAddTask(newTask);
    closeModal();
  };

  useEffect(() => {
    setTitle(initialTitle);
    setStatus(initialStatus);
  }, [editingTask]);

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
