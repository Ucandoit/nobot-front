import { TablePagination } from '@material-ui/core';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { CardTable, CardTableToolbar } from '../card';
import * as useAsyncFunction from '../helpers/useAsyncFunction';
import { cards } from '../mocks';
import CardList from './CardList';

describe('CardList', () => {
  let wrapper: ShallowWrapper;
  let mockUseAsyncFunction: jest.SpyInstance<[any, boolean, string | null, () => void]>;

  beforeAll(() => {
    mockUseAsyncFunction = jest.spyOn(useAsyncFunction, 'default');
    mockUseAsyncFunction.mockReturnValue([[cards, 20], false, null, jest.fn()]);
  });

  beforeEach(() => {
    wrapper = shallow(<CardList />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change page when onChangePage triggered on TablePagination', () => {
    wrapper.find(TablePagination).invoke('onChangePage')(null, 2);
    expect(mockUseAsyncFunction.mock.calls.pop()[2]).toEqual(2);
  });

  it('should change page and size when onChangeRowsPerPage triggered on TablePagination', () => {
    wrapper.find(TablePagination).invoke('onChangeRowsPerPage')!({ target: { value: '5' } } as React.ChangeEvent<
      HTMLInputElement
    >);
    expect(mockUseAsyncFunction.mock.calls.pop()[2]).toEqual(0);
    expect(mockUseAsyncFunction.mock.calls.pop()[3]).toEqual(5);
  });

  it('should change sort state when changeSort triggered on CardTable', () => {
    wrapper.find(CardTable).invoke('changeSort')('cost');
    expect(mockUseAsyncFunction.mock.calls.pop()[4]).toEqual('cost');
    expect(mockUseAsyncFunction.mock.calls.pop()[5]).toEqual('asc');

    wrapper.find(CardTable).invoke('changeSort')('cost');
    expect(mockUseAsyncFunction.mock.calls.pop()[4]).toEqual('cost');
    expect(mockUseAsyncFunction.mock.calls.pop()[5]).toEqual('desc');
  });

  it('should change filter state when changeFilter triggered', () => {
    wrapper.find(CardTableToolbar).invoke('changeFilter')('cost', '2.5');
    expect(mockUseAsyncFunction.mock.calls.pop()[6]).toEqual({
      cost: '2.5'
    });
  });

  it('should reset filter state when resetFilter triggered', () => {
    wrapper.find(CardTableToolbar).invoke('resetFilter')();
    expect(mockUseAsyncFunction.mock.calls.pop()[6]).toEqual({});
  });
});
