import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'state-management/user-info';
import API from 'util/api';

export const useQueryTableDataQuestion = () => {
  const location = useLocation();
  const { search } = location;

  const userInfo = useRecoilValue(userInfoAtom);

  const { role, id } = userInfo || {};

  return useQuery(['GET_TABLE_QUESTION', search], () => {
    return API.request({
      url: `/questions${search || '?page=1'}&size=10&creatorId=${role === 'ADMIN' ? '' : id}`
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
