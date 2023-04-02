import { useMutation } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import { useNavigate } from 'react-router-dom';
import API from 'util/api';

export const useMutationCreateQuestion = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation(
    (params) =>
      API.request({
        method: 'POST',
        url: '/questions',
        params
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Tạo câu hỏi thành công!',
          status: 'success'
        });
        navigate('/cau-hoi');
      },
      onError: () => Toast.show({ content: 'Tạo câu hỏi thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
