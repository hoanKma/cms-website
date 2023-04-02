import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import { countChangeAtom, fileListAtom, fileListDeletedAtom, fileListRejectAtom } from './recoil';

export const useResetAtom = (id) => {
  const resetFileListAtom = useResetRecoilState(fileListAtom(id));
  const resetFileListRejectAtom = useResetRecoilState(fileListRejectAtom(id));
  const resetFileListDeletedAtom = useResetRecoilState(fileListDeletedAtom(id));
  const resetCountChangeAtom = useResetRecoilState(countChangeAtom(id));

  return useCallback(() => {
    resetFileListAtom();
    resetFileListRejectAtom();
    resetFileListDeletedAtom();
    resetCountChangeAtom();
  }, [resetCountChangeAtom, resetFileListAtom, resetFileListDeletedAtom, resetFileListRejectAtom]);
};
