import React from 'react';
import './Paginacion.scss'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>


      {pages.map(num => (
        <button 
          key={num} 
          onClick={() => onPageChange(num)} 
          className={currentPage === num ? 'active' : ''}
        >
          {num}
        </button>
      ))}


      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
