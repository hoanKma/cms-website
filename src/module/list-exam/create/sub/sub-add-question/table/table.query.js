import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'state-management/user-info';
import API from 'util/api';

export const useQueryTableDataQuestion = ({ topicId, level, subjectId }) => {
  const location = useLocation();
  const { search } = location;

  const userInfo = useRecoilValue(userInfoAtom);

  const { role, id } = userInfo || {};

  return useQuery(['GET_TABLE_QUESTION_IN_CREATE_EXAM', search, subjectId, level, topicId], () => {
    const levelQuery = level ? `&level=${level}` : '';
    const subjectIdQuery = subjectId ? `&subjectId=${subjectId}` : '';
    const topicIdQuery = topicId ? `&topicId=${topicId}` : '';

    return API.request({
      url: `/questions${search || '?page=1'}&size=10&creatorId=${
        role === 'ADMIN' ? '' : id
      }${levelQuery}${subjectIdQuery}${topicIdQuery}`,
      params: {
        sort: 'updatedAt desc'
      },
      getTotal: true
    });
  });
};
