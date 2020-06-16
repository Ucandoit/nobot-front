import { useAsyncFunction } from '../../helpers';
import { TableProps } from './Table';
import { ListAndCount, TableColumn } from './types';
import { usePagination } from './usePagination';
import { useSort } from './useSort';

const initialValue = [[], 0];

export const useTable = <T>(
  columns: TableColumn<T>[],
  identifier: keyof T,
  initialSort: keyof T,
  get: any
): TableProps<T> => {
  const paginationOption = usePagination();
  const sortOption = useSort(initialSort);
  const { page, size } = paginationOption;
  const { sort, order } = sortOption;
  const [records] = useAsyncFunction<ListAndCount<T>>(get, initialValue as ListAndCount<T>, page, size, sort, order);
  return { columns, identifier, records, paginationOption, sortOption };
};
