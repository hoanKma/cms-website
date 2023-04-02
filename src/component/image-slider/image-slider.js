import { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import Lightbox from 'react-image-lightbox';

const ImageSlider = forwardRef((props, ref) => {
  const { images, onClose } = props;
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const imageList = Array.isArray(images) ? images : [images];

  const onCloseRequest = useCallback(() => {
    setShow(false);
    onClose && onClose();
  }, [onClose]);

  useImperativeHandle(ref, () => ({
    show(imageIndex) {
      setIndex(imageIndex || 0);
      setShow(true);
    }
  }));

  if (!show) {
    return null;
  }

  return (
    <Lightbox
      mainSrc={imageList[index]}
      nextSrc={imageList[(index + 1) % imageList.length]}
      prevSrc={imageList[(index + imageList.length - 1) % imageList.length]}
      onCloseRequest={onCloseRequest}
      onMovePrevRequest={() => setIndex((index + imageList.length - 1) % imageList.length)}
      onMoveNextRequest={() => setIndex((index + 1) % imageList.length)}
      className="lp-lightbox"
      reactModalStyle={{
        overlay: {
          zIndex: 10000
        }
      }}
    />
  );
});

export default memo(ImageSlider);
