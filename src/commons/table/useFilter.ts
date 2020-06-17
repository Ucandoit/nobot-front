import { useCallback, useState } from 'react';
import { FilterField } from './types';

const useFilter = <T>(filterFields: FilterField<T>[], initialFilters: Partial<T> = {}) => {
  const [filters, setFilters] = useState<Partial<T>>(initialFilters);
  const changeFilter = useCallback(
    (property: keyof T, value: string) => {
      setFilters({
        ...filters,
        [property]: value
      });
    },
    [filters]
  );

  const resetFilter = useCallback(() => {
    setFilters({});
  }, []);

  return { filterFields, filters, changeFilter, resetFilter };
};

export default useFilter;
