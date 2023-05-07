import { Button, Flex, Icon, Input } from '@chakra-ui/react';
import { ButtonCreate, ButtonSearch } from 'component/button';
import PropTypes from 'prop-types';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TableControl = (props) => {
  const { children, createRoute, onSearch, disableSearch, defaultSearchValue, MoreAction, action = true } = props;
  const [keyword, setKeyword] = useState(defaultSearchValue);
  const inputSearchRef = useRef();

  const onClickSearch = useCallback(() => onSearch(keyword), [keyword, onSearch]);

  const onChangeSearch = useCallback((e) => setKeyword(e.target.value), []);

  const onKeyDownSearch = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSearch(keyword);
        inputSearchRef.current.blur();
      }
    },
    [keyword, onSearch]
  );

  const onClearSearch = useCallback(() => {
    setKeyword('');
    onSearch('');
  }, [onSearch]);

  useEffect(() => setKeyword(defaultSearchValue || ''), [defaultSearchValue]);

  return (
    <Flex flexDirection="column" w="full">
      <Flex justifyContent="space-between" w="full">
        <Flex gap={2} flex={1}>
          {!disableSearch && (
            <>
              <Flex position="relative">
                <Input
                  w="400px"
                  pr={10}
                  value={keyword}
                  onChange={onChangeSearch}
                  onKeyDown={onKeyDownSearch}
                  ref={inputSearchRef}
                />
                {!!keyword && (
                  <Button
                    position="absolute"
                    top={1.5}
                    right={2}
                    zIndex={5}
                    w={7}
                    h={7}
                    p={0}
                    color="#828282"
                    minW={0}
                    bgColor="transparent"
                    _hover={{ bgColor: 'transparent', color: '#737373' }}
                    _active={{ bgColor: 'transparent' }}
                    onClick={onClearSearch}
                  >
                    <Icon as={FaTimes} fontSize={18} />
                  </Button>
                )}
              </Flex>
              <ButtonSearch onClick={onClickSearch} />
            </>
          )}
        </Flex>
        {action && (
          <Flex gap={6}>
            {!!MoreAction && MoreAction}
            <Link to={createRoute}>
              <ButtonCreate />
            </Link>
          </Flex>
        )}
      </Flex>
      <Flex flexWrap="wrap" mt={5}>
        {children}
      </Flex>
    </Flex>
  );
};

TableControl.propTypes = {
  createRoute: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  disableSearch: PropTypes.bool,
  defaultSearchValue: PropTypes.string
};

export default memo(TableControl);
