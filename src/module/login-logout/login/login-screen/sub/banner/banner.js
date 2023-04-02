import { memo, useEffect } from 'react';

import { Center, Flex } from '@chakra-ui/react';
import { useResetRecoilState } from 'recoil';

import { BannerSliderPositionAtom } from 'module/login-logout/recoil';
import Background from './sub/background';
import Banner1 from './sub/banner-1';
import Banner2 from './sub/banner-2';
import Banner3 from './sub/banner-3';
import SliderButton from './sub/slider-button';

const Banner = memo(() => {
  const resetPosition = useResetRecoilState(BannerSliderPositionAtom);
  useEffect(() => () => resetPosition(), [resetPosition]);

  // How this works:
  // - BannerSliderPositionAtom: current banner position
  // - BannerX reads position
  // - SliderButton writes position
  // - When position changes (by clicking SliderButton),
  //   Banner check if it is selected. If so, it scrolls to itself.
  return (
    <Flex direction="column" position="relative" w="55%" flex={1} display={{ xs: 'none', xl: 'flex' }}>
      <Background />

      <Flex flex={5} overflowX="hidden">
        <Banner1 />
        <Banner2 />
        <Banner3 />
      </Flex>

      <Center flex={1} gap={2}>
        <SliderButton position={1} />
        <SliderButton position={2} />
        <SliderButton position={3} />
      </Center>
    </Flex>
  );
});

export default Banner;
