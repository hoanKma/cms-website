import { memo, useEffect, useRef } from 'react';

import { Text, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { BannerSliderPositionAtom } from 'module/login-logout/recoil';

const Banner1 = memo(() => {
  const currentPosition = useRecoilValue(BannerSliderPositionAtom);
  useEffect(() => {
    if (currentPosition === 1) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPosition]);
  const ref = useRef(null);

  return (
    <VStack
      ref={ref}
      // 2 next props are important for sizing:
      // - Fill parent's "width"
      w="100%"
      // - Don't allow shrinking
      flexShrink={0}
      h="full"
      color="#FFF"
      justify="center"
      alignItems="center"
    >
      {/**
       * scale-down behaves like:
       * - none when container is bigger
       * - contain when container is smaller
       */}
      {/* <Image src={Banner1Img} fit="scale-down" height="80%" /> */}
      <Text>ảnh banner 1</Text>

      <VStack maxW="500px" px={4}>
        {/* <Heading as="h1" fontSize="36px" fontWeight={700} textAlign="center">
          Khám phá
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Kết nối thông tin đa dạng, minh bạch và là cầu nối tin cậy cho mọi nhà đầu tư.
        </Text> */}
        <Text>Tiêu đề banner1</Text>
      </VStack>
    </VStack>
  );
});

export default Banner1;
