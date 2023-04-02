import { useQuery } from '@tanstack/react-query';
import API from 'util/api';

export const useQueryTableDataTeacherAccount = () => {
  return useQuery(['GET_TABLE_TEACHER_ACCOUNT'], () => {
    return API.request({
      url: '/users',
      params: {
        role: 'TEACHER'
      }
    });
  });
};
