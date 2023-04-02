import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { RecoilRoot } from 'recoil';
import DropList from './drop-list';

const DropDownlist = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <DropList {...props} ref={ref} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

DropDownlist.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.array,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isRequired: PropTypes.bool,
  customValidate: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func
};

export default memo(DropDownlist);
