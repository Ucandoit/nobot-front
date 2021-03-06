import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar
} from '@material-ui/core';
import React, { useCallback } from 'react';
import { ListAndCount } from '../../helpers';
import FilterField from './FilterField';
import { FilterField as FilterFieldType, FilterOptions, PaginationOption, SortOption, TableColumn } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  header: {
    backgroundColor: '#c5cae9'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  smallCell: {
    maxWidth: '4rem'
  },
  faceImg: {
    height: '2rem',
    width: '2rem'
  }
}));

export interface TableProps<T> {
  columns: TableColumn<T>[];
  records: ListAndCount<T>;
  paginationOption: PaginationOption;
  sortOption: SortOption<T>;
  filterOptions: FilterOptions<T>;
}

export const Table = <T,>({
  columns,
  records: [rows, count],
  paginationOption: { page, size, changePage, changeRowsPerPage },
  sortOption: { sort, order, changeSort },
  filterOptions: { filters, filterFields, changeFilter }
}: TableProps<T>) => {
  const classes = useStyles();

  const onSortCellClick = useCallback(
    (property: keyof T) => () => {
      changeSort(property);
    },
    [changeSort]
  );
  return (
    <>
      <Toolbar className={classes.root}>
        {filterFields.map((field: FilterFieldType<T>, index) => {
          const props = {
            ...field,
            value: filters[field.property] as any,
            changeFilter
          };
          return <FilterField key={index} {...props} />;
        })}
        {/* <Button variant="contained" color="secondary" onClick={resetFilter}>
          Reset
        </Button> */}
      </Toolbar>
      <TableContainer>
        <MuiTable className={classes.table} size="small" aria-label="table">
          <TableHead className={classes.header}>
            <TableRow>
              {columns.map(({ label, property, sortable, colWidth }, index) => (
                <TableCell
                  key={index}
                  className={colWidth === 'small' ? classes.smallCell : ''}
                  sortDirection={sort === property ? order : false}
                >
                  {sortable && typeof property !== 'function' ? (
                    <TableSortLabel
                      active={sort === property}
                      direction={sort === property ? order : 'asc'}
                      onClick={onSortCellClick(property)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                {columns.map(header => (
                  <TableCell key={`${index}-${header.property}`}>
                    {typeof header.property === 'function' ? header.property(row) : row[header.property]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={size}
        page={page}
        onChangePage={changePage}
        onChangeRowsPerPage={changeRowsPerPage}
      />
    </>
  );
};

export default Table;
