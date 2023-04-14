import { useQuery } from '@tanstack/react-query';
import API from 'util/api';

export const useQueryUserInfo = () => {
  return useQuery(['USER_INFO'], () => {
    return API.request({
      url: '/user-info'
    });
  });
};
