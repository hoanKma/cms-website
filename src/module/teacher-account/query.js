import { useQuery } from '@tanstack/react-query';
import API from 'util/api';

export const useQueryUserInfoByID = (id) => {
  return useQuery(['USER_INFO_BY_ID', id], () => {
    return API.request({
      url: `/users/${id}`
    });
  });
};
