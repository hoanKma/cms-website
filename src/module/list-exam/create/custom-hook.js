import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import { currentSubjectCreateAtom } from './recoil';

export const useResetAtom = () => {
  const resetCurrentSubjectCreate = useResetRecoilState(currentSubjectCreateAtom);

  return useCallback(() => {
    resetCurrentSubjectCreate();
  }, [resetCurrentSubjectCreate]);
};
