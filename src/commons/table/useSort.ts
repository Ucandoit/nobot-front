import { useCallback, useState } from 'react';
import { Order, SortOption } from './types';

export const useSort = <T>(defaultSort: keyof T, defaultOrder: Order = 'asc'): SortOption<T> => {
  const [sort, setSort] = useState<keyof T>(defaultSort);
  const [order, setOrder] = useState<Order>(defaultOrder);

  const changeSort = useCallback(
    (property: keyof T) => {
      const isAsc = sort === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setSort(property);
    },
    [order, sort]
  );

  return { sort, order, changeSort };
};
