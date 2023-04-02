import { useMutation } from '@tanstack/react-query';
import Toast from 'base-component/toast';

import API from 'util/api';
import { LS_KEY_SB_JWT } from 'util/const';

const useLogin = (navigate, rhfSetError) => {
  return useMutation(
    (params) =>
      API.request({
        method: 'POST',
        url: '/auth/login',
        params
      }),
    {
      onSuccess: (response) => {
        localStorage.setItem(LS_KEY_SB_JWT, response.accessToken);
        API.setAccessToken(response.accessToken);
        navigate(`/`);
      },
      onError: (error) => {
        const { name: code, statusCode: status } = error;

        const setErrorAndFocus = (key, message) => rhfSetError(key, { message }, { shouldFocus: true });

        // prettier-ignore
        if      (code === '2')
          setErrorAndFocus('userName', 'Tên đăng nhập không tồn tại');
        else if (code === '31')
          setErrorAndFocus('userName', 'Tên đăng nhập không hợp lệ');
        else if (code === '32')
          setErrorAndFocus('password', 'Mật khẩu không hợp lệ');
        else if (code === '34')
          setErrorAndFocus('password', 'Mật khẩu không chính xác');
        
        else if (status >= 500 && status < 600)
          Toast.show({ content: 'Hệ thống đang gặp lỗi. Bạn vui lòng thử lại sau.', status: 'error' })
        else
          Toast.show({ content: 'Lỗi đăng nhập không xác định, bạn cần đăng nhập lại', status: 'error' })

        return;
      }
    }
  );
};

export default useLogin;
