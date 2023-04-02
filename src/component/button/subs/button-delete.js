import { Icon } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ButtonDelete = (props) => {
  const { onClick, isDisabled, isLoading, width = 8, height = 8 } = props;

  return (
    // <ChakraProvider>
    <Button
      width={width}
      height={height}
      bgColor="#f7941e"
      color="#FFF"
      _hover={{ bgColor: '#ec8609' }}
      _active={{ bgColor: '#ec8609' }}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      <Icon as={FaTrashAlt} boxSize={3} />
    </Button>
    // </ChakraProvider>
  );
};

ButtonDelete.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(ButtonDelete);
