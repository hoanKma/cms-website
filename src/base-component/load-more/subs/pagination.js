import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LoadMorePaging = (props) => {
  const { defaultValue, maxPage, onChange } = props;
  const [page, setPage] = useState(defaultValue || 1);

  const onChangePage = useCallback((e) => setPage(Number(e.target.value)), []);

  const onKeyDownSearch = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onChange && onChange(page);
      }
    },
    [onChange, page]
  );

  const onNextPage = useCallback(
    () =>
      setPage((prev) => {
        let value = null;
        if (maxPage && prev === maxPage) {
          value = prev;
        } else {
          value = prev ? prev + 1 : 1;
        }
        onChange && onChange(value);
        return value;
      }),
    [maxPage, onChange]
  );

  const onPrevPage = useCallback(
    () =>
      setPage((prev) => {
        const value = prev < 2 ? prev : prev - 1;
        onChange && onChange(value);
        return value;
      }),
    [onChange]
  );

  return (
    // <ChakraProvider>
    <Flex gap={5} alignItems="center">
      <Button
        bgColor="#f7941e"
        color="#FFF"
        _hover={{ bgColor: '#ec8609' }}
        _active={{ bgColor: '#ec8609' }}
        onClick={onPrevPage}
        isDisabled={!page || page < 2}
      >
        <Icon as={FaChevronLeft} />
      </Button>
      <Flex alignItems="center" gap={3}>
        <Input
          px={2}
          type="number"
          textAlign="center"
          w={12}
          onChange={onChangePage}
          value={page}
          onKeyDown={onKeyDownSearch}
        />
        {!!maxPage && <Text>/ {maxPage}</Text>}
      </Flex>
      <Button
        bgColor="#f7941e"
        color="#FFF"
        _hover={{ bgColor: '#ec8609' }}
        _active={{ bgColor: '#ec8609' }}
        onClick={onNextPage}
        isDisabled={maxPage ? page === maxPage : false}
      >
        <Icon as={FaChevronRight} />
      </Button>
    </Flex>
    // </ChakraProvider>
  );
};

LoadMorePaging.propTypes = {
  defaultValue: PropTypes.number,
  maxPage: PropTypes.number,
  onChange: PropTypes.func
};

export default memo(LoadMorePaging);
