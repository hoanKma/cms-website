import { useMutation } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import { useNavigate } from 'react-router-dom';
import API from 'util/api';

export const useMutationCreateExam = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation(
    (params) =>
      API.request({
        method: 'POST',
        url: '/exams',
        params
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Tạo đề thành công!',
          status: 'success'
        });
        navigate('/de-thi');
      },
      onError: () => Toast.show({ content: 'Tạo đề thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationUpdateQuestion = (id) => {
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation(
    (params) =>
      API.request({
        method: 'PATCH',
        url: `/questions/${id}`,
        params
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Cập nhật câu hỏi thành công!',
          status: 'success'
        });
        navigate(`../chi-tiet/${id}`);
      },
      onError: () => Toast.show({ content: 'Cập nhật câu hỏi thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
