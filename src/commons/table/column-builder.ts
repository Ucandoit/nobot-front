import { TableColumn } from './types';

export default class ColumnBuilder<T> {
  private columns: TableColumn<T>[] = [];

  addColumn(
    label: string,
    property: keyof T | ((row: T) => string | JSX.Element),
    sortable = true,
    colWidth: 'small' | 'normal' | 'large' = 'small'
  ) {
    this.columns.push({
      label,
      property,
      sortable,
      colWidth
    });
    return this;
  }

  getColumns = () => {
    return this.columns;
  };
}
