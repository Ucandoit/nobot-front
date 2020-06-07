import { TableHead, TableSortLabel } from '@material-ui/core';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { cards } from './cards.mock';
import CardTable from './CardTable';

const changeSort = jest.fn();

describe('CardTable', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<CardTable cards={cards} sort="number" order="asc" changeSort={changeSort} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeSort function on column header click', () => {
    wrapper
      .find(TableHead)
      .find(TableSortLabel)
      .at(1)
      .simulate('click');
    expect(changeSort).toHaveBeenCalledTimes(1);
    expect(changeSort).toHaveBeenCalledWith('name');
  });
});
