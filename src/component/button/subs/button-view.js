import { Icon } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaEye } from 'react-icons/fa';

const ButtonView = (props) => {
  const { onClick, isLoading, width = 8, height = 8 } = props;

  return (
    // <ChakraProvider>
    <Button
      bgColor="#f7941e"
      color="#FFF"
      _hover={{ bgColor: '#ec8609' }}
      _active={{ bgColor: '#ec8609' }}
      onClick={onClick}
      isLoading={isLoading}
      width={width}
      height={height}
    >
      <Icon as={FaEye} boxSize={3.5} />
    </Button>
    // </ChakraProvider>
  );
};

ButtonView.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(ButtonView);
