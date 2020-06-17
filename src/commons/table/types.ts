export interface TableColumn<T> {
  label: string;
  property: keyof T | ((row: T) => string | JSX.Element);
  sortable: boolean;
  colWidth: 'small' | 'normal' | 'large';
}

export interface PaginationOption {
  page: number;
  size: number;
  changePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
  changeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SortOption<T> {
  sort: keyof T;
  order: Order;
  changeSort: (property: keyof T) => void;
}

export type Order = 'asc' | 'desc';

export interface InitialOptions<T> {
  sort: keyof T;
  order?: Order;
  filters?: Partial<T>;
}

export type FilterType = 'select' | 'text';

export interface FilterField<T> {
  property: keyof T;
  label: string;
  type: FilterType;
  items: string[] | { key: string; value: string }[];
}

export interface FilterOptions<T> {
  filterFields: FilterField<T>[];
  filters: Partial<T>;
  changeFilter: (property: keyof T, value: string) => void;
}
