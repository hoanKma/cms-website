import { memo, useEffect, useRef } from 'react';

import { Heading, Text, VStack } from '@chakra-ui/react';
import Banner1Img from 'assets/images/Picture3.png';
import { useRecoilValue } from 'recoil';

import Image from 'component/image/image';
import { BannerSliderPositionAtom } from 'module/login-logout/recoil';

const Banner3 = memo(() => {
  const currentPosition = useRecoilValue(BannerSliderPositionAtom);
  useEffect(() => {
    if (currentPosition === 3) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPosition]);
  const ref = useRef(null);

  return (
    // Read <Banner1> for props explanation
    <VStack ref={ref} w="100%" flexShrink={0} color="#FFF" justify="center" alignItems="center">
      <Image src={Banner1Img} height="400px" borderRadius={10} />

      <Heading as="h1" fontSize="20px" fontWeight={700} textAlign="center">
        Đồng hành
        <Text fontSize="lg" textAlign="center" pt={4}>
          Điểm số tối ưu
        </Text>
      </Heading>
    </VStack>
  );
});

export default Banner3;
