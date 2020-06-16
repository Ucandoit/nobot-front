export interface TableColumn<T> {
  label: string;
  property: keyof T;
  sortable: boolean;
  colWidth: 'small' | 'normal' | 'large';
}

export type ListAndCount<T> = [T[], number];

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
