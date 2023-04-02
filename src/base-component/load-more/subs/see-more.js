import { Button, Icon } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const LoadMoreButton = (props) => {
  const { isDisabled, isLoading, onClick } = props;
  return (
    // <ChakraProvider>
    <Button
      leftIcon={<Icon as={FaChevronDown} w={3.5} />}
      bgColor="#f7941e"
      color="#FFF"
      _hover={{ bgColor: '#ec8609' }}
      _active={{ bgColor: '#ec8609' }}
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      Xem thêm
    </Button>
    // </ChakraProvider>
  );
};

LoadMoreButton.propTypes = {
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func
};

export default memo(LoadMoreButton);
