import { memo } from 'react';

import { Flex, Image } from '@chakra-ui/react';

import BannerArrow from 'module/login-logout/assets/banner-arrow.svg';
import BannerCandle from 'module/login-logout/assets/banner-candle.svg';
import BannerSide from 'module/login-logout/assets/banner-side.svg';

const Background = memo(() => (
  <Flex zIndex="-1" position="absolute" w="100%" h="100%" bg="primary.1">
    {/**
     * SVG as <img> source can scale to fit.
     * https://css-tricks.com/scale-svg/#aa-option-1-use-image-auto-sizing
     */}
    <Image pos="absolute" top="50%" width="full" src={BannerCandle} />

    <Image pos="absolute" top="40%" width="full" src={BannerSide} />

    <Image pos="absolute" top="20%" right="10%" width="40%" src={BannerArrow} />
  </Flex>
));

export default Background;
