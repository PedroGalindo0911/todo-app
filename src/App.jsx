import React, { useState } from 'react';
import Header from './components/Header';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); // El filtro siempre se inicia en All

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <Header filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default App;
