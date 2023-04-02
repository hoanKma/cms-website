import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import Datepicker from './datepicker';

const Main = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <Datepicker {...props} ref={ref} />
    // </ChakraProvider>
  );
});

Main.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      startDate: PropTypes.number,
      endDate: PropTypes.number
    })
  ]),
  dateFormat: PropTypes.string,
  isClearable: PropTypes.bool,
  isRequired: PropTypes.bool,
  placeHolder: PropTypes.string,
  isRangeDate: PropTypes.bool,
  isHours: PropTypes.bool,
  onChange: PropTypes.func,
  customValidate: PropTypes.func,
  onError: PropTypes.func
};

export default memo(Main);
