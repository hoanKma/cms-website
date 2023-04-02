import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { RecoilRoot } from 'recoil';
import Table from './table';

const Main = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <Table {...props} ref={ref} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

Main.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      toolTip: PropTypes.string,
      headerTextAlign: PropTypes.oneOf([undefined, 'left', 'right', 'center']),
      rowText: PropTypes.shape({
        align: PropTypes.oneOf([undefined, 'left', 'right', 'center']),
        color: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  rowKey: PropTypes.string,
  config: PropTypes.shape({
    headerBackgroundColor: PropTypes.string,
    oddRowBackgroundColor: PropTypes.string,
    evenRowBackgroundColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    headerTextSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showIndex: PropTypes.bool
  }),
  action: PropTypes.func,
  customRow: PropTypes.func
};

export default memo(Main);
