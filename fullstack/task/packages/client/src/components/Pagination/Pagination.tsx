const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, className }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={className}>
            {pageNumbers.map(number => (
                <button 
                    key={number} 
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 border border-gray-300 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                    {number}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;