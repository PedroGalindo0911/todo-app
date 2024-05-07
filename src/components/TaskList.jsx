import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, filter, handleTaskStatusChange }) {
  const handleCheckboxChange = (taskId, newStatus) => {
    handleTaskStatusChange(taskId, newStatus); 
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'incomplete') {
      return task.status === 'incomplete';
    } else if (filter === 'completed') {
      return task.status === 'completed';
    } else {
      return true;
    }
  });

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleCheckboxChange={handleCheckboxChange} 
          date={task.date}
        />
      ))}
    </div>
  );
}

export default TaskList;
