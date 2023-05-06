import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import API from 'util/api';

export const useQueryTableDataTeacherAccount = () => {
  const location = useLocation();
  const { search } = location;
  return useQuery(['GET_TABLE_TEACHER_ACCOUNT', search], () => {
    return API.request({
      url: `/users${search || '?page=1'}&size=10`,
      params: {
        role: 'TEACHER',

        sort: 'updatedAt desc'
      },
      getTotal: true
    });
  });
};
