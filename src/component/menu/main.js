import PropTypes from 'prop-types';
import { memo } from 'react';
import { RecoilRoot } from 'recoil';
import Menu from './menu';

const Main = memo((props) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <Menu {...props} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

Main.propTypes = {
  config: PropTypes.shape({
    menuBackgroundColor: PropTypes.string,
    hoverBackgroundColor: PropTypes.string,
    selectionBackgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    canScrollHeader: PropTypes.bool,
    canScrollFooter: PropTypes.bool,
    canOpenMultiGroup: PropTypes.oneOf([undefined, 'single', 'multiple']),
    mode: PropTypes.oneOf([undefined, 'drawer'])
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sub: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          icon: PropTypes.func,
          action: PropTypes.func
        })
      ),
      icon: PropTypes.func,
      action: PropTypes.func
    })
  ),
  Header: PropTypes.element,
  Footer: PropTypes.element
};

export default Main;
