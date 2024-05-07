import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, filter }) {
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
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
