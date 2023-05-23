import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'state-management/user-info';
import API from 'util/api';

export const useQueryGetCountUser = (role) => {
  return useQuery(['GET_COUNT_USER', role], () => {
    return API.request({
      url: `/users/count?role=${role}`
    });
  });
};

export const useQueryGetCountQuestion = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const creatorId = userInfo?.id !== '641eef0821477ff3d7a94724' && `&creatorId=${userInfo?.id}`;

  return useQuery(['GET_COUNT_QUESTION', creatorId], () => {
    return API.request({
      url: `/questions/count?${creatorId}`
    });
  });
};

export const useQueryGetCountExam = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const creatorId = userInfo?.id !== '641eef0821477ff3d7a94724' && `&creatorId=${userInfo?.id}`;

  return useQuery(['GET_COUNT_EXAM', creatorId], () => {
    return API.request({
      url: `/exams/count?${creatorId}`
    });
  });
};

export const useQueryGetCountExamByDate = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const creatorId = userInfo?.id !== '641eef0821477ff3d7a94724' && `&creatorId=${userInfo?.id}`;

  return useQuery(['GET_COUNT_EXAM_BY_DATE', creatorId], () => {
    return API.request({
      url: `/exams/get-by-date?${creatorId}`
    });
  });
};

export const useQueryGetCountQuestionByDate = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const creatorId = userInfo?.id !== '641eef0821477ff3d7a94724' && `&creatorId=${userInfo?.id}`;

  return useQuery(['GET_COUNT_QUESTION_BY_DATE', creatorId], () => {
    return API.request({
      url: `/questions/get-by-date?${creatorId}`
    });
  });
};
