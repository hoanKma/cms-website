import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import API from 'util/api';

export const useMutationChangePassword = (onClose) => {
  const { mutate, isLoading, error } = useMutation(
    (params) =>
      API.request({
        method: 'POST',
        url: '/users/change-password',
        params
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Đổi mật khẩu thành công!',
          status: 'success'
        });
        onClose();
      },
      onError: (error) => Toast.show({ content: error?.message || 'Đổi mật khẩu thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationChangeAvatar = (id, onClose) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    ({ avatar }) =>
      API.request({
        method: 'PATCH',
        url: `/users/${id}`,
        params: { avatar }
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Cập nhật avatar thành công!',
          status: 'success'
        });
        queryClient.refetchQueries(['USER_INFO']);
        onClose();
      },
      onError: () => Toast.show({ content: 'Cập nhật avatar thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
