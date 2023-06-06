import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutationUploadImage } from 'util/mutate';
import { useMutationChangeAvatar } from './mutate';

const ChangeAvatarModal = ({ id, isOpen, onClose }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { mutate: uploadImage, data: avatarUrl } = useMutationUploadImage();

  const handleSelectAvatar = (event) => {
    const file = event.target.files[0];
    setSelectedAvatar(URL.createObjectURL(file));
    uploadImage({ file });
  };

  const { mutate: changeAvatar, isLoading } = useMutationChangeAvatar(id, onClose);

  useEffect(() => {
    if (isOpen) {
      setSelectedAvatar();
    }
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    changeAvatar({ avatar: avatarUrl?.url });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đổi avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="avatar">Chọn ảnh</FormLabel>
              <Input type="file" id="avatar" accept="image/*" onChange={handleSelectAvatar} />
            </FormControl>
            {selectedAvatar && (
              <Box mb={4}>
                <Image src={selectedAvatar} alt="Selected Avatar" />
              </Box>
            )}
            <Button type="submit" isLoading={isLoading}>
              Thay đổi avatar
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>{/* Các nút footer khác (nếu cần) */}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeAvatarModal;
