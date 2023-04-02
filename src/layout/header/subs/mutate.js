import { useMutation } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import { useNavigate } from 'react-router-dom/dist';
import API from 'util/api';
import { LS_KEY_SB_JWT } from 'util/const';

export const useMutationLogOut = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(
    () =>
      API.request({
        method: 'POST',
        url: '/auth/logout'
      }),
    {
      onSuccess: () => {
        localStorage.removeItem(LS_KEY_SB_JWT);
        navigate('/dang-nhap');
        API.clearAccessToken();
        Toast.show({
          content: 'Đăng xuất thành công',
          status: 'success'
        });
      },
      onError: () => Toast.show({ content: 'Đăng xuất thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
