import { memo, useEffect, useRef } from 'react';

import { Text, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { BannerSliderPositionAtom } from 'module/login-logout/recoil';

const Banner2 = memo(() => {
  const currentPosition = useRecoilValue(BannerSliderPositionAtom);
  useEffect(() => {
    if (currentPosition === 2) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPosition]);
  const ref = useRef(null);

  return (
    // Read <Banner1> for props explanation
    <VStack ref={ref} h="full" w="100%" flexShrink={0} color="#FFF" justify="center" alignItems="center">
      {/* <Image src={Banner2Img} fit="scale-down" height="80%" /> */}
      <Text>ảnh banner 2</Text>

      <VStack maxW="500px" px={4}>
        {/* <Heading as="h1" fontSize="36px" fontWeight={700} textAlign="center">
          Thông tin doanh nghiệp
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Góc nhìn đa chiều từ cơ bản đến kỹ thuật, và thị trường đang bàn luận về cổ phiếu rôm rả như thế nào.
        </Text> */}
        <Text>Tiêu đề banner 2</Text>
      </VStack>
    </VStack>
  );
});

export default Banner2;
