import { Select } from '@material-ui/core';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import FilterField from './FilterField';

const changeFilter = jest.fn();

describe('FilterField', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <FilterField property="cost" label="Cost" items={[1.0, 1.5, 2, 2.5]} value={''} changeFilter={changeFilter} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`should render correctly when passing value other than ''`, () => {
    wrapper.setProps({
      value: 1.5
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeFilter function on select', () => {
    wrapper.find(Select).simulate('change', { target: { value: 1.5 } });
    expect(changeFilter).toHaveBeenCalledTimes(1);
    expect(changeFilter).toHaveBeenCalledWith('cost', 1.5);
  });
});
