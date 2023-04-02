import { forwardRef, memo, useImperativeHandle } from 'react';

import {
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';

const ModalNoFeature = forwardRef((_, ref) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useImperativeHandle(ref, () => ({
    show: onOpen,
    hide: onClose
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ xs: 'sm', md: 'xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Đăng nhập bằng tài khoản Facebook, Google <Divider pt={1} />
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody mt={1} mb={5}>
          <Flex align="center" justify="center">
            <Text fontSize={16} textAlign="center">
              Bạn đã có tài khoản đăng nhập bằng Facebook, Google?
              <br />
              Liên hệ hỗ trợ{' '}
              <Link
                href="mailto:support@stockbook.vn?subject=Hỗ trợ đăng nhập bằng tài khoản Google, Facebook&body=Họ tên:%0D%0ASố điện thoại:%0D%0ANickname:"
                title="Gửi mail hỗ trợ tới support@stockbook.vn"
                color="primary.1"
              >
                tại đây
              </Link>
              .
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default memo(ModalNoFeature);
