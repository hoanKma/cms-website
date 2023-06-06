import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutationChangePassword } from './mutate';

const ChangePasswordPage = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: changePassword, isLoading } = useMutationChangePassword(onClose);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem tất cả các trường đã được nhập đầy đủ
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Xác nhận mật khẩu không khớp',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    changePassword({ oldPassword: currentPassword, newPassword });

    // Reset trường dữ liệu
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đổi mật khẩu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="currentPassword">Mật khẩu hiện tại</FormLabel>
              <Input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="newPassword">Mật khẩu mới</FormLabel>
              <InputGroup>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleToggleNewPassword}>
                    {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="confirmPassword">Xác nhận mật khẩu</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleToggleConfirmPassword}>
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button type="submit" isLoading={isLoading}>
              Đổi mật khẩu
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>{/* Các nút footer khác (nếu cần) */}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordPage;
