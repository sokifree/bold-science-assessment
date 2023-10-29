import {ChangeEvent, ReactElement, useCallback, useMemo, useState} from "react";

// generic over T where items can be countries or timezones
export interface PaginatedListProps<T> {
    items: T[];
    loading: boolean;
    defaultPage: number;
    defaultPageSize: number;
    render: (item: T) => ReactElement;
}

export function PaginatedList<T>(props: PaginatedListProps<T>) {
    const { items, defaultPage, defaultPageSize, render, loading } = props;

    const [page, setPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const numPages = useMemo(() => Math.ceil(items.length / pageSize), [items.length, pageSize]);

    const pageButtons = useMemo(() => {
        const getRange = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, x) => x + from);

        const getButton = (i: number) => <button key={i} className={i === page ? 'current-page page-button' : 'page-button'} onClick={() => setPage(i)}>{i}</button>;
        const ellipsis = <span className='page-button'>...</span>

        if (numPages <= 6) {
            const numbers = getRange(1, numPages);
            return <>
                {numbers.map(getButton)}
            </>
        }

        if (page <= 4) {
            const start = getRange(1, 5);
            const end = getRange(numPages - 1, numPages);

            return <>
                {start.map(getButton)}
                {ellipsis}
                {end.map(getButton)}
            </>
        }

        if (numPages - page <= 3) {
            const start = getRange(1, 2);
            const end = getRange(numPages - 4, numPages);

            return <>
                {start.map(getButton)}
                {ellipsis}
                {end.map(getButton)}
            </>
        }

        const startButton = getButton(1);
        const endButton = getButton(numPages);
        const middle = getRange(page - 1, page + 1);

        return <>
            {startButton}
            {ellipsis}
            {middle.map(getButton)}
            {ellipsis}
            {endButton}
        </>
    }, [numPages, page]);

    const onPageSizeChanged = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = Number(e.currentTarget.value);
        setPageSize(newPageSize);
        const newNumPages = Math.ceil(items.length / newPageSize);
        
        // cheekily move to the last page
        if (page > newNumPages) {
            setPage(newNumPages);
        }
    }, [items.length, page]);

    const pageSelector = useMemo(() => {
        const pageSizes = [5, 10, 20, 50, 500];
        return <select value={pageSize} onChange={onPageSizeChanged}>
            {pageSizes.map(ps => <option value={ps} key={ps}>{ps}</option>)}
        </select>
    }, [pageSize, onPageSizeChanged])

    const toMinPage = useMemo(() => {
        return <button className='page-button' onClick={() => setPage(1)}>&lt;&lt;</button>
    }, []);

    const toPrevPage = useMemo(() => {
        return <button className='page-button' disabled={page<=1} onClick={() => setPage(page-1)}>&lt;</button>
    }, [page]);

    const toNextPage = useMemo(() => {
        return <button className='page-button' disabled={page===numPages} onClick={() => setPage(page+1)}>&gt;</button>
    }, [numPages, page]);
    
    const toMaxPage = useMemo(() => {
        return <button className='page-button' onClick={() => setPage(numPages)}>&gt;&gt;</button>
    }, [numPages]);

    const paginator = useMemo(() => {
        return <div>
            <span className='paginator'>
                {pageSelector}
                <span className='vertical-line' />
                {toMinPage}
                {toPrevPage}
                {pageButtons}
                {toNextPage}
                {toMaxPage}
            </span>
        </div>
    }, [pageSelector, toMinPage, toNextPage, pageButtons, toPrevPage, toMaxPage]);

    const currentPage = useMemo(() => {
        const startIdx = (page - 1) * pageSize;
        const pagedItems = items.slice(startIdx, startIdx + pageSize);

        if (pagedItems.length === 0) {
            return <p>No results found</p>
        }

        return pagedItems.map(render);
    }, [items, page, pageSize, render]);

    return <div>
        {paginator}
        {
            loading && <span>Items currently loading...</span>
        }
        {
            !loading && <div className='paginated-list'>
                {currentPage}
            </div>
        }
        {paginator}
    </div>
}
PaginatedList.displayName = 'PaginatedList';