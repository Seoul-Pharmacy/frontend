import './Pagination.css';
import React, { useState } from 'react';

export default function Pagination({ totalItems, paginate, currentPage, itemsPerPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const [currentGroup, setCurrentGroup] = useState(0);
  const pagesPerGroup = 5; // 한 번에 노출할 페이지 개수
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  // 현재 그룹에 포함될 페이지 번호 계산
  const startIndex = currentGroup * pagesPerGroup;
  const endIndex = Math.min(startIndex + pagesPerGroup, totalPages);
  const currentPageNumbers = pageNumbers.slice(startIndex, endIndex);

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      const newGroup = currentGroup - 1;
      setCurrentGroup(newGroup);
      const lastPageOfPreviousGroup = (newGroup + 1) * pagesPerGroup;
      paginate(lastPageOfPreviousGroup);
    }
  };

  const handleNextGroup = () => {
    if (currentGroup < totalGroups - 1) {
      const newGroup = currentGroup + 1;
      setCurrentGroup(newGroup);
      const firstPageOfNextGroup = newGroup * pagesPerGroup + 1;
      paginate(firstPageOfNextGroup);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {/* 첫 번째 그룹일 때 왼쪽 화살표 버튼 숨김 */}
        {currentGroup > 0 && (
          <li className="page-item">
            <button onClick={handlePrevGroup} className="page-button">
              &laquo;
            </button>
          </li>
        )}
        {currentPageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-button">
              {number}
            </button>
          </li>
        ))}
        {/* 마지막 그룹일 때 오른쪽 화살표 버튼 숨김 */}
        {currentGroup < totalGroups - 1 && (
          <li className="page-item">
            <button onClick={handleNextGroup} className="page-button">
              &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}