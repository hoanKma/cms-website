import { Image } from '@chakra-ui/react';
import ImageSlider from 'component/image-slider';
import { memo, useRef } from 'react';

export const AdvancedImgTag = memo((props) => {
  const { src, imageUrls } = props;

  const imageSliderRef = useRef();

  return (
    <>
      <Image
        src={src}
        cursor="pointer"
        objectFit="cover"
        borderWidth={src ? 1 : 'none'}
        borderColor="#E6E6E6"
        w="100%"
        borderLeft="none"
        borderRadius="none"
        borderRight="none"
        boxShadow="0px 0px 1px 0px rgb(0 0 0 / 20%)"
        onClick={() => {
          const indexImage = imageUrls.findIndex((item) => item === src);
          imageSliderRef.current?.show(indexImage);
        }}
      />

      <ImageSlider ref={imageSliderRef} images={imageUrls} />
    </>
  );
});
