import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { Button } from 'component/button';
import { memo } from 'react';

const TableFile = ({ files }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!Array.isArray(files) || !files.length) {
    return null;
  }

  return (
    <>
      <Button
        bgColor="transparent"
        _hover={{ bgColor: 'transparent' }}
        _active={{ bgColor: 'transparent' }}
        onClick={onOpen}
      >
        <Text as="span">
          {files.length} file{files.length > 1 ? 's' : ''}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Danh sách file đính kèm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={5}>
              {files.map((item) => (
                <Flex key={item}>
                  <Text noOfLines={1}>
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      {item}
                    </a>
                  </Text>
                </Flex>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(TableFile);
