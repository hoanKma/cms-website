import { Icon, Text } from '@chakra-ui/react';
import Button from 'base-component/button';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ButtonSubmit = (props) => {
  const { onClick, isDisabled, isLoading, title } = props;

  return (
    <Button
      type="submit"
      bgColor="#f7941e"
      color="#FFF"
      _hover={{ bgColor: '#ec8609' }}
      _active={{ bgColor: '#ec8609' }}
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      <Icon as={FaPaperPlane} boxSize={3.5} />
      <Text as="span" ml={2}>
        {title || 'Gửi'}
      </Text>
    </Button>
  );
};

ButtonSubmit.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default memo(ButtonSubmit);
