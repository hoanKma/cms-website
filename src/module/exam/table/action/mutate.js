import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import API from 'util/api';

export const useMutationDeleteQuestion = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    (id) =>
      API.request({
        method: 'DELETE',
        url: `/questions/${id}`
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Xoá câu hỏi thành công!',
          status: 'success'
        });
        queryClient.refetchQueries('GET_TABLE_QUESTION');
      },
      onError: () => Toast.show({ content: 'Xoá câu hỏi thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
