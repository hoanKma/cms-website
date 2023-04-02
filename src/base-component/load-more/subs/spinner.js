import { Flex, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LoadMoreSpin = (props) => {
  const { onLoadMore, isLoading, color = '#f7941e', size = 'md' } = props;
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (onLoadMore && inView) {
      onLoadMore();
    }
  }, [inView, onLoadMore]);

  return (
    // <ChakraProvider>
    <Flex ref={loadMoreRef} alignItems="center" justifyContent="center" minH="1px" flexShrink={0}>
      {isLoading && <Spinner color={color} size={size} />}
    </Flex>
    // </ChakraProvider>
  );
};

LoadMoreSpin.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};

export default memo(LoadMoreSpin);
