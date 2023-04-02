import { Image as ChakraImage } from '@chakra-ui/react';
import { memo } from 'react';

const Image = (props) => {
  const {
    src,
    placeHolder,
    objectFit,
    onError,
    onLoaded,
    w,
    h,
    boxSize,
    width,
    height,
    alt = 'vndirect image',
    borderRadius
  } = props;

  return (
    <ChakraImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      w={w}
      h={h}
      boxSize={boxSize}
      borderRadius={borderRadius}
      fallback={placeHolder}
      fit={objectFit}
      onError={onError}
      onLoad={onLoaded}
    />
  );
};

export default memo(Image);
