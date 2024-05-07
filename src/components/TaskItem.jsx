import React from 'react';

function TaskItem({ task }) {
  const { id, title, status } = task;

  return (
    <div className="task-item">
      <input type="checkbox" checked={status === 'completed'} readOnly />
      <p>{title}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default TaskItem;
