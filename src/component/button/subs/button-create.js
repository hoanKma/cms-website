import { Icon, Text } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaPlus } from 'react-icons/fa';

const ButtonCreate = (props) => {
  const { onClick, isLoading } = props;

  return (
    // <ChakraProvider>
    <Button
      bgColor="#f7941e"
      color="#FFF"
      _hover={{ bgColor: '#ec8609' }}
      _active={{ bgColor: '#ec8609' }}
      onClick={onClick}
      isLoading={isLoading}
    >
      <Icon as={FaPlus} boxSize={3.5} />
      <Text as="span" ml={2}>
        Tạo mới
      </Text>
    </Button>
    // </ChakraProvider>
  );
};

ButtonCreate.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool
};

export default memo(ButtonCreate);
