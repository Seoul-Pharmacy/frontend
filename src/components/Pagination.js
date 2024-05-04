import './Pagination.css';

export default function Pagination({ totalItems, paginate, currentPage, itemsPerPage }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
  
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-button"  id={`${currentPage === number ? 'active-page' : ''}`}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}