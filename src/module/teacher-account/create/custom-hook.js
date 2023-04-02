import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import { imagesListAddedAtom, imagesListAtom, imagesListDeletedAtom } from './recoil';

export const useResetAtom = () => {
  const resetFileListAtom = useResetRecoilState(imagesListAtom);
  const resetFileListDeletedAtom = useResetRecoilState(imagesListAddedAtom);
  const resetFileListAddedAtom = useResetRecoilState(imagesListDeletedAtom);

  return useCallback(() => {
    resetFileListAtom();
    resetFileListDeletedAtom();
    resetFileListAddedAtom();
  }, [resetFileListAddedAtom, resetFileListAtom, resetFileListDeletedAtom]);
};
