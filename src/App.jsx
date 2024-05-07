import React, { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { tasksData } from './Task';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <Header  filter={filter} setFilter={setFilter} />
      <TaskList tasks={tasksData} filter={filter} />
    </div>
  );
}

export default App;
