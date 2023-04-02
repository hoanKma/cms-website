import { memo, useEffect, useRef } from 'react';

import { Text, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

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
    <VStack ref={ref} w="100%" flexShrink={0} color="#FFF" h="full" justify="center" alignItems="center">
      {/* <Image src={Banner3Img} fit="scale-down" height="80%" /> */}
      <Text>ảnh banner 3</Text>

      <VStack maxW="500px" px={4}>
        {/* <Heading as="h1" fontSize="36px" fontWeight={700} textAlign="center">
          Bảng tin
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Kết nối thông tin, kinh nghiệm, kiến thức đầu tư giữa các thành viên trong cộng đồng.
        </Text> */}
        <Text>Tiêu đề banner 3</Text>
      </VStack>
    </VStack>
  );
});

export default Banner3;
