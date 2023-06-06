import { memo, useEffect, useRef } from 'react';

import { Heading, Text, VStack } from '@chakra-ui/react';
import Banner1Img from 'assets/images/Picture1.png';
import { useRecoilValue } from 'recoil';

import Image from 'component/image/image';
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
      gap={4}
    >
      {/**
       * scale-down behaves like:
       * - none when container is bigger
       * - contain when container is smaller
       */}
      <Image src={Banner1Img} fit="scale-down" height="70%" borderRadius={10} />

      <Heading as="h1" fontSize="20px" fontWeight={700} textAlign="center">
        Khám phá
        <Text fontSize="lg" textAlign="center" pt={4}>
          Ứng dụng trắc nghiệm tốt nhất cho học sinh THPT
        </Text>
      </Heading>
    </VStack>
  );
});

export default Banner1;
