import { Flex, FormLabel, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const FieldLabel = (props) => {
  const { title, isRequired, htmlFor, description } = props;

  return (
    <Flex>
      <FormLabel htmlFor={htmlFor}>{title}</FormLabel>
      {isRequired && (
        <Text color="#e60000" fontWeight={500}>
          *
        </Text>
      )}
      {!!description && (
        <Text as="span" color="#828282">
          {description}
        </Text>
      )}
    </Flex>
  );
};

FieldLabel.propTypes = {
  title: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  htmlFor: PropTypes.string
};

export default memo(FieldLabel);
