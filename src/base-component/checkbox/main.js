import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { RecoilRoot } from 'recoil';
import CheckboxComponent from './checkbox-component';

const Main = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <CheckboxComponent {...props} ref={ref} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

Main.propTypes = {
  arrayValue: PropTypes.array,
  defaultValue: PropTypes.array,
  isRequired: PropTypes.bool,
  customValidate: PropTypes.func,
  onError: PropTypes.func,
  numOfColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(Main);
