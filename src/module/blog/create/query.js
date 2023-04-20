import { useQuery } from '@tanstack/react-query';
import API from 'util/api';

export const useQueryTopicBySubject = (subjectId) => {
  return useQuery(['useQueryTopicBySubject', subjectId], () => {
    return (
      API.request({
        url: `/topics?subjectId=${subjectId}`
      }),
      { enable: !!subjectId }
    );
  });
};
