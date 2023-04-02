import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { RecoilRoot } from 'recoil';
import ControlledRadioGroup from './controlled-radio-group';

const RadioBoxGroup = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <ControlledRadioGroup {...props} ref={ref} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

RadioBoxGroup.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  isRequired: PropTypes.bool,
  customValidate: PropTypes.func,
  onError: PropTypes.func,
  numOfColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(RadioBoxGroup);
