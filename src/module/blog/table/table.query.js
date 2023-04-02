import { useQuery } from '@tanstack/react-query';
import API from 'util/api';

export const useQueryTableDataQuestion = () => {
  return useQuery(['GET_TABLE_QUESTION'], () => {
    return API.request({
      url: '/questions'
    });
  });
};

export const useQueryDetailQuestion = (id) => {
  return useQuery(
    ['GET_DETAIL_QUESTION', id],
    () => {
      return API.request({
        url: `/questions/${id}`
      });
    },
    { enable: !!id }
  );
};
