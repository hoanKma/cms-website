import { Text } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';

const ButtonBack = (props) => {
  const { onClick, isLoading } = props;

  return (
    // <ChakraProvider>
    <Button
      bgColor="#EDF2F7"
      _hover={{ bgColor: '#E2E8F0' }}
      _active={{ bgColor: '#E2E8F0' }}
      onClick={onClick}
      isLoading={isLoading}
    >
      <Text as="span">Trở về</Text>
    </Button>
    // </ChakraProvider>
  );
};

ButtonBack.propTypes = {
  onClick: PropTypes.func
};

export default memo(ButtonBack);
