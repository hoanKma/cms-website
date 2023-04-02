import Popup from 'base-component/popup';

import { Button, Flex, Text } from '@chakra-ui/react';
import { memo, useRef } from 'react';

export default memo(() => {
  const popupRef = useRef();
  return (
    <Flex mt={20} gap={5}>
      <Button onClick={() => popupRef.current.show()}>Mở popup</Button>
      <Popup title="Xác nhận" ref={popupRef} onConfirm={() => console.log('confirmed')}>
        <Text>Xác nhận thay đổi này?</Text>
      </Popup>
    </Flex>
  );
});
