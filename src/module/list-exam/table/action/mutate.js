import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import API from 'util/api';

export const useMutationDeleteExam = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    (id) =>
      API.request({
        method: 'DELETE',
        url: `/exams/${id}`
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Xoá đề thi thành công!',
          status: 'success'
        });
        queryClient.refetchQueries('GET_TABLE_LIST_EXAM');
      },
      onError: () => Toast.show({ content: 'Xoá đề thi thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
