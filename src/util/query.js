import { useQuery } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import isEmpty from 'lodash/isEmpty';
import API from 'util/api';

export const useQueryDetail = (queryKey, url, id) => {
  let queryId = id;
  if (Array.isArray(id)) {
    queryId = id.join(' ');
  }
  const { isInitialLoading, data, error } = useQuery(
    queryKey,
    () =>
      API.request({
        url,
        params: { q: `id:(${queryId})` }
      }).then((response) => {
        if (!Array.isArray(response) || !response.length) {
          throw new Error('Không thể lấy thông tin chi tiết');
        }
        if (Array.isArray(id)) {
          return response;
        }
        return response[0];
      }),
    {
      onError: (e) => Toast.show(`Lỗi: ${e?.error?.msg || 'Không thể lấy thông tin chi tiết'}`),
      enabled: !isEmpty(id)
    }
  );

  return { isLoading: isInitialLoading, data, error };
};

export const useQueryMedia = (parentId) => {
  let queryParentId = parentId;
  if (Array.isArray(parentId)) {
    queryParentId = parentId.join(' ');
  }

  const { isInitialLoading, data, error } = useQuery(
    ['GET_LIST_MEDIA', parentId],
    () => {
      return API.request({
        url: '/solr/media/select',
        params: {
          q: `parentId:(${queryParentId})`,
          start: 0,
          rows: 1000
        }
      });
    },
    {
      onError: (e) => Toast.show(`Lỗi: ${e?.error?.msg || 'Không thể lấy dữ liệu'}`),
      enabled: !isEmpty(queryParentId)
    }
  );

  return { isLoading: isInitialLoading, data, error };
};

export const useQueryUserInfo = () => {
  return useQuery(
    ['USER_INFO'],
    () =>
      API.request({
        url: '/user-info'
      }).catch((e) => {
        Toast.show(`Lỗi: ${e?.error?.msg || 'Không thể lấy thông tin cá nhân'}`);
      }),
    {
      enabled: !!'nickname'
    }
  );
};

export const useQuerySubject = () => {
  return useQuery(['SUBJECT'], () =>
    API.request({
      url: '/subjects'
    })
  );
};
