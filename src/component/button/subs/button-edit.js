import { Icon } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const ButtonEdit = (props) => {
  const { onClick, isLoading, width = 8, height = 8 } = props;

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
    >
      <Icon as={FaPencilAlt} boxSize={3} />
    </Button>
    // </ChakraProvider>
  );
};

ButtonEdit.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(ButtonEdit);
