interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (size: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange
}: PaginationProps) {
    const pageSizeOptions = [5, 10, 20, 50];

    return (
        <div className="flex flex-col items-center space-y-4 mt-6">
            {/* Only show page navigation if there's more than one page */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-6 py-2 rounded-md ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-blue-900">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-6 py-2 rounded-md ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Always show items per page selector */}
            <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-900">Items per page:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="px-2 py-1 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
} 