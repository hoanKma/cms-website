import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { RecoilRoot } from 'recoil';
import DropListQuery from './drop-list-query';

const DropDownlistQuery = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <DropListQuery {...props} ref={ref} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

DropDownlistQuery.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.array,
  defaultValue: PropTypes.array,
  isRequired: PropTypes.bool,
  customValidate: PropTypes.func,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string
};

export default memo(DropDownlistQuery);
