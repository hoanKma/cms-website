import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { forwardRef, memo, useCallback, useImperativeHandle } from 'react';

const Popup = forwardRef((props, ref) => {
  const { children, title, onConfirm, isCentered, size = 'md' } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConfirmPopup = useCallback(() => {
    onClose();
    onConfirm();
  }, [onClose, onConfirm]);

  useImperativeHandle(ref, () => ({
    show: () => onOpen(),
    hide: () => onClose()
  }));

  return (
    // <ChakraProvider>
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap={6}>
          <Button
            bgColor="#f7941e"
            color="#FFF"
            _hover={{ bgColor: '#ec8609' }}
            _active={{ bgColor: '#ec8609' }}
            onClick={onConfirmPopup}
          >
            Xác nhận
          </Button>
          <Button onClick={onClose}>Huỷ bỏ</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    // </ChakraProvider>
  );
});

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isCentered: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'])
};

export default memo(Popup);
