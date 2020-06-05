import { Button } from '@material-ui/core';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import CardTableToolbar from './CardTableToolbar';
import FilterField from './FilterField';

const changeFilter = jest.fn();
const resetFilter = jest.fn();

describe('CardTableToolbar', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<CardTableToolbar filters={{}} changeFilter={changeFilter} resetFilter={resetFilter} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with filters', () => {
    wrapper.setProps({ filters: { cost: 1.5, rarity: '煌' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeFilter function on FilterField changeFilter triggers', () => {
    wrapper
      .find(FilterField)
      .at(0)
      .invoke('changeFilter')('rarity', '極');
    expect(changeFilter).toHaveBeenCalledTimes(1);
    expect(changeFilter).toHaveBeenCalledWith('rarity', '極');
  });

  it('should call resetFilter function on FilterField resetFilter triggers', () => {
    wrapper.find(Button).simulate('click');
    expect(resetFilter).toHaveBeenCalledTimes(1);
  });
});
