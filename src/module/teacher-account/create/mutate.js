import { useMutation } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import { useNavigate } from 'react-router-dom';
import API from 'util/api';

export const useMutationCreateTeacherAccount = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation(
    (params) =>
      API.request({
        method: 'POST',
        url: '/users',
        params
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Tạo tài khoản giáo viên thành công!',
          status: 'success'
        });
        navigate('/teacher-account');
      },
      onError: () => Toast.show({ content: 'Tạo tài khoản giáo viên thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
