import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'state-management/user-info';
import API from 'util/api';

export const useQueryTableDataListExam = () => {
  const location = useLocation();
  const { search } = location;
  const userInfo = useRecoilValue(userInfoAtom);

  const creatorId = userInfo?.id !== '641eef0821477ff3d7a94724' && `&creatorId=${userInfo?.id}`;

  return useQuery(['GET_TABLE_LIST_EXAM', search], () => {
    return API.request({
      url: `/exams${search || '?page=1'}&size=10${creatorId}`,
      params: {
        sort: 'updatedAt desc'
      },
      getTotal: true
    });
  });
};

export const useQueryDetailExam = (id) => {
  return useQuery(
    ['GET_DETAIL_EXAM', id],
    () => {
      return API.request({
        url: `/exams/${id}`
      });
    },
    { enabled: !!id }
  );
};
