import { useMemo } from 'react';

import { IconButton, useDisclosure } from '@chakra-ui/react';

import { ReactComponent as HidePasswordIcon } from 'module/login-logout/assets/password-hide.svg';
import { ReactComponent as ShowPasswordIcon } from 'module/login-logout/assets/password-show.svg';
import { ReactComponent as PasswordIcon } from 'module/login-logout/assets/password.svg';
import { ReactComponent as UsernameIcon } from 'module/login-logout/assets/username.svg';

const useFormConfig = (isSubmitting) => {
  // Somehow size props can't be used with object or array responsive syntax
  // So do manual responsive instead
  // https://github.com/chakra-ui/chakra-ui/issues/6927

  const usernameFormConfig = useMemo(
    () => ({
      key: 'username',
      placeholder: 'Tên đăng nhập',
      rules: { required: 'Bạn chưa điền Tên đăng nhập' },
      disable: isSubmitting,
      fontWeight: 600,
      autoCapitalize: 'off',
      inputLeft: <UsernameIcon />
    }),
    [isSubmitting]
  );

  const { isOpen: showPass, onToggle: toggleShowPass } = useDisclosure();
  const passwordFormConfig = useMemo(
    () => ({
      key: 'password',
      type: showPass ? 'text' : 'password',
      placeholder: 'Mật khẩu',
      rules: { required: 'Bạn chưa điền Mật khẩu' },
      disable: isSubmitting,
      fontWeight: 600,
      inputLeft: <PasswordIcon />,
      inputRight: (
        <IconButton
          variant="unstyled"
          onClick={toggleShowPass}
          // Label shows upcoming state
          aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          // Icon shows current state
          icon={showPass ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        />
      )
    }),
    [isSubmitting, showPass, toggleShowPass]
  );

  return [usernameFormConfig, passwordFormConfig];
};

export default useFormConfig;
