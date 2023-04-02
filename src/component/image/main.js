import PropTypes from 'prop-types';
import { memo } from 'react';
import Image from './image';

const Main = memo((props) => {
  return (
    // <ChakraProvider>
    <Image {...props} />
    // </ChakraProvider>
  );
});

Main.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  placeHolder: PropTypes.element,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  objectFit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none', 'scale-down', 'initial', 'inherit']),
  onError: PropTypes.func,
  onLoaded: PropTypes.func
};

export default Main;
