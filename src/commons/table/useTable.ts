import { ListAndCount, useAsyncFunction } from '../../helpers';
import { TableProps } from './Table';
import { FilterField, InitialOptions, TableColumn } from './types';
import useFilter from './useFilter';
import { usePagination } from './usePagination';
import { useSort } from './useSort';

const initialValue = [[], 0];

export const useTable = <T>(
  columns: TableColumn<T>[],
  { sort: initialSort, order: initialOrder, filters: initialFilters }: InitialOptions<T>,
  filterFields: FilterField<T>[],
  fetchData: (...args: any[]) => Promise<ListAndCount<T>>
): TableProps<T> => {
  const paginationOption = usePagination();
  const sortOption = useSort(initialSort, initialOrder);
  const filterOptions = useFilter<T>(filterFields, initialFilters);
  const { page, size } = paginationOption;
  const { sort, order } = sortOption;
  const [records] = useAsyncFunction<ListAndCount<T>>(
    fetchData,
    initialValue as ListAndCount<T>,
    page,
    size,
    sort,
    order,
    filterOptions.filters
  );
  return { columns, records, paginationOption, sortOption, filterOptions };
};
