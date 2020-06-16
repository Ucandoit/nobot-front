import { useCallback, useState } from 'react';
import { PaginationOption } from './types';

export const usePagination = (initialPage = 0, initialSize = 10): PaginationOption => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const changePage = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  }, []);

  const changeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return { page, size, changePage, changeRowsPerPage };
};
