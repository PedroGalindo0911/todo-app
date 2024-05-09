import React from 'react';
import './Header.css';

function Header({ openModal, filter, setFilter }) {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="header">
      <div className="title-container">
        <h1 className="title">TODO LIST</h1>
      </div>
      <div className="filter-container">
        <button className="add-task-button" onClick={openModal}>
          Add Task
        </button>
        <select className="filter-select" value={filter} onChange={handleFilterChange}>
          <option value="all">ALL</option>
          <option value="incomplete">INCOMPLETED</option>
          <option value="completed">COMPLETED</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
