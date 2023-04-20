import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import API from 'util/api';

export const useMutationDelete = (queryKey) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    ({ url, id }) =>
      API.request({
        method: 'DELETE',
        url,
        params: { id: Array.isArray(id) ? id : [id] }
      }),
    {
      onSuccess: (_, { onSuccess, showToast = true }) => {
        showToast &&
          Toast.show({
            content: 'Xoá thành công!',
            status: 'success'
          });
        queryClient.invalidateQueries(queryKey);
        onSuccess && onSuccess();
      },
      onError: () => Toast.show({ content: 'Xoá thất bại', status: 'error' })
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationCreate = () => {
  const { mutate, isLoading, error } = useMutation(
    ({ url, params, method = 'POST' }) => {
      return API.request({
        url,
        method,
        params
      });
    },
    {
      onSuccess: (_, { onSuccess, showToast = true }) => {
        showToast &&
          Toast.show({
            status: 'success',
            content: 'Tạo mới thành công!'
          });
        onSuccess && onSuccess();
      },
      onError: () => {
        Toast.show({
          status: 'error',
          content: 'Tạo mới thất bại'
        });
      }
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationUpdate = () => {
  const { mutate, isLoading, error } = useMutation(
    ({ url, params, method = 'PUT' }) => {
      return API.request({
        url,
        method,
        params
      });
    },
    {
      onSuccess: (_, { onSuccess, showToast = true }) => {
        showToast &&
          Toast.show({
            status: 'success',
            content: 'Cập nhật thành công!'
          });

        onSuccess && onSuccess();
      },
      onError: (_, { onError }) => {
        Toast.show({
          status: 'error',
          content: 'Cập nhật thất bại'
        });
        onError && onError();
      }
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationCreateMedia = () => {
  const { mutate, isLoading, error } = useMutation(
    ({ params }) => {
      return API.request({
        url: '/solr/media/update',
        method: 'POST',
        params
      });
    },
    {
      onSuccess: (_, { onSuccess }) => {
        onSuccess && onSuccess();
      },
      onError: () =>
        Toast.show({
          status: 'error',
          content: 'Không thể tải lên file'
        })
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationUpdateMedia = () => {
  const { mutate, isLoading, error } = useMutation(
    ({ params, method = 'PUT' }) => {
      if (Array.isArray(params) && params.length) {
        const requestParams = params.map((item) => {
          const { id, ...rest } = item;
          const dataTransform = Object.entries(rest).reduce((prev, curr) => {
            const [field, value] = curr;
            const obj = {};
            obj[field] = { set: value };
            return { ...prev, ...obj };
          }, {});
          return { id, ...dataTransform };
        });

        return API.request({
          url: '/solr/media/update',
          method: 'PUT_DEFAULT',
          params: requestParams
        });
      }
      return API.request({
        url: '/solr/media/update',
        method,
        params
      });
    },
    {
      onSuccess: (_, { onSuccess, showToast = true }) => {
        showToast &&
          Toast.show({
            status: 'success',
            content: 'Cập nhật thành công!'
          });
        onSuccess && onSuccess();
      },
      onError: () =>
        Toast.show({
          status: 'error',
          content: 'Cập nhật thất bại'
        })
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationDeleteMedia = () => {
  const { mutate, isLoading, error } = useMutation(
    ({ id }) =>
      API.request({
        method: 'DELETE',
        url: '/solr/media/update',
        params: { id }
      }),
    {
      onSuccess: (_, { onSuccess }) => {
        onSuccess && onSuccess();
      },
      onError: () => Toast.show('Không thể xoá file')
    }
  );
  return { mutate, isLoading, error };
};

export const useMutationUploadImage = () => {
  const { mutate, isLoading, error, data } = useMutation(
    ({ file }) =>
      API.upload({
        file
      })
    // {
    //   onSuccess: () => {
    //     Toast.show({
    //       content: 'Tải ảnh lên thành công',
    //       status: 'success'
    //     });
    //   },
    //   onError: () =>
    //     Toast.show({
    //       content: 'Tải ảnh lên thất bại',
    //       status: 'error'
    //     })
    // }
  );
  return { mutate, isLoading, error, data };
};
