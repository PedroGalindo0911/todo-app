import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'; 

import './TaskItem.css';

function TaskItem({ task, handleCheckboxChange }) {
  const { id, title, status, date } = task;
  const [isChecked, setIsChecked] = useState(status === 'completed');

  useEffect(() => {
    setIsChecked(status === 'completed');
  }, [status]);

  const handleChange = () => {
    const updatedStatus = isChecked ? 'incomplete' : 'completed';
    handleCheckboxChange(id, updatedStatus);
    setIsChecked(!isChecked);
  };

  return (
    <div className="task-item">
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="checkbox"
        />
        <div className={`checkbox-overlay ${isChecked ? 'checked' : ''}`}></div>
      </div>
      <div className="task-details">
        <p className={`task-title ${isChecked ? 'checked' : ''}`}>{title}</p>
        <p className="task-date">Created: {date}</p>
      </div>
      <button className="edit-button"><FontAwesomeIcon icon={faPen} /></button>
      <button className="delete-button"><FontAwesomeIcon icon={faTrash} /></button>
    </div>
  );
}

export default TaskItem;
