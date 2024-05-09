import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function TaskList({ tasks, filter, handleEditTask, handleDeleteTask, openAddModal }) {
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
      {tasks.length === 0 ? (
        <button className="no-task-button" onClick={openAddModal}>
          No Todos Found
        </button>
      ) : (
        <TransitionGroup>
          {filteredTasks.map((task) => (
            <CSSTransition key={task.id} timeout={300} classNames="task">
              <TaskItem
                key={task.id}
                task={task}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
}

export default TaskList;
