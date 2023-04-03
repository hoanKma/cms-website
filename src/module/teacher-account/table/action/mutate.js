import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import API from 'util/api';

export const useMutationTeacherAccount = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (id) =>
      API.request({
        method: 'DELETE',
        url: `/users/${id}`
      }),
    {
      onSuccess: () => {
        Toast.show({
          content: 'Xoá giáo viên thành công!',
          status: 'success'
        });
        queryClient.refetchQueries(['GET_TABLE_TEACHER_ACCOUNT']);
      },
      onError: () => Toast.show({ content: 'Xoá giáo viên thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};
