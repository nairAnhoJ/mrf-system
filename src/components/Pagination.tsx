import IconRenderer from './icons';

function Pagination({
    page,
    pageCount,
    perPage,
    handlePerPage,
    handleFirstPage,
    handlePrevious,
    handleNext,
    handleLastPage,
    pageArray,
    handlePageClick,
}: {
    page: number;
    pageCount: number;
    perPage: number;
    handlePerPage: (pPage: number) => void;
    handleFirstPage: () => void;
    handlePrevious: () => void;
    handleNext: () => void;
    handleLastPage: () => void;
    pageArray: number[];
    handlePageClick: (pageClicked: number) => void;
}) {

    return (
        <>
            <div className='w-full'>
                <div className='w-full flex items-center justify-between py-2 font-semibold'>
                    <div>
                        <div className='flex items-center gap-x-3'>
                            <p>Items per page</p>
                            <select name="" id="" value={perPage} onChange={(e) => handlePerPage(Number(e.target.value))} className='py-2 pl-3 pr-2 border border-gray-400 rounded shadow-inner dark:bg-gray-800'>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={250}>250</option>
                                <option value={500}>500</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-x-1'>
                            <button disabled={page==1} onClick={handleFirstPage} className={`rounded hover:bg-blue-400 hover:text-gray-50 transition-colors duration-200 ease-in-out p-1 ${ page == 1 ? 'pointer-events-none' : '' }`}>
                                <IconRenderer name={'firstPage'} className={'w-[26px] h-[26px]'}></IconRenderer>
                            </button>
                            <button disabled={page==1} onClick={handlePrevious} className={`flex items-center justify-end rounded hover:bg-blue-400 hover:text-gray-100 transition-colors duration-200 ease-in-out p-1 w-8 h-8 pr-[6px] ${ page == 1 ? 'pointer-events-none' : '' }`}>
                                <IconRenderer name={'previous'} className={'w-4 h-4'}></IconRenderer>
                            </button>
                            {
                                pageArray.map((pageItem, index) => (
                                    <button disabled={page==pageItem} onClick={() => handlePageClick(pageItem)} key={index} className={`flex items-center justify-center rounded hover:bg-blue-400 hover:text-gray-50 transition-colors duration-200 ease-in-out p-1 w-8 h-8 font-semibold ${(page == pageItem) ? 'bg-blue-400 text-gray-50' : '' }`}>
                                        {pageItem}
                                    </button>
                                ))
                            }
                            <button disabled={page==pageCount} onClick={handleNext} className={`flex items-center justify-center rounded hover:bg-blue-400 hover:text-gray-100 transition-colors duration-200 ease-in-out p-1 w-8 h-8 pl-[5px] ${ page == pageCount ? 'pointer-events-none' : '' }`}>
                                <IconRenderer name={'next'} className={'w-4 h-4'}></IconRenderer>
                            </button>
                            <button disabled={page==pageCount} onClick={handleLastPage} className={`rounded hover:bg-blue-400 hover:text-gray-100 transition-colors duration-200 ease-in-out p-1 ${ page == pageCount ? 'pointer-events-none' : '' }`}>
                                <IconRenderer name={'lastPage'} className={'w-[26px] h-[26px]'}></IconRenderer>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pagination;