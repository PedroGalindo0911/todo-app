import React from 'react';

function Header({ openModal, filter, setFilter }) {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="header">
      <h1 className="title">TODO LIST</h1>
      <button className="add-task-button" onClick={openModal}>
        Add Task
      </button>
      <div className="filter-container">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
