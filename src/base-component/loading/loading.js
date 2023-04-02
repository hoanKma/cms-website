import { Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Loading = (props) => {
  const { color = '#f7941e', size = 'md' } = props;
  return (
    // <ChakraProvider>
    <Spinner color={color} size={size} justifySelf="flex-end" />
    // </ChakraProvider>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};

export default memo(Loading);
