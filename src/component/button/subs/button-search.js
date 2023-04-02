import { Icon, Text } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaSearch } from 'react-icons/fa';

const ButtonSearch = (props) => {
  const { onClick, isLoading, title, width, height } = props;

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
      <Icon as={FaSearch} boxSize={3.5} />
      {!!title && (
        <Text as="span" ml={2}>
          {title}
        </Text>
      )}
    </Button>
    // </ChakraProvider>
  );
};

ButtonSearch.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(ButtonSearch);
