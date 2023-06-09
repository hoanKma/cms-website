import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import {
  currentSubjectCreateAtom,
  errorContentAtom,
  errorImageAtom,
  errorTitleAtom,
  hasContentAtom,
  hasDescriptionAtom,
  hasTitleAtom,
  imagesHTMlListAtom,
  imagesListAtom
} from './recoil';

export const useResetAtom = () => {
  const resetFileListAtom = useResetRecoilState(imagesListAtom);
  const resetHasTitleAtom = useResetRecoilState(hasTitleAtom);
  const resetHasDescriptionAtom = useResetRecoilState(hasDescriptionAtom);
  const resetHasContentAtom = useResetRecoilState(hasContentAtom);
  const resetErrorImageAtom = useResetRecoilState(errorImageAtom);
  const resetErrorContentAtom = useResetRecoilState(errorContentAtom);
  const resetErrorTitleAtom = useResetRecoilState(errorTitleAtom);
  const resetImagesHTMlListAtom = useResetRecoilState(imagesHTMlListAtom);
  const resetCurrentSubjectCreate = useResetRecoilState(currentSubjectCreateAtom);

  return useCallback(() => {
    resetFileListAtom();
    resetHasTitleAtom();
    resetErrorImageAtom();
    resetErrorTitleAtom();
    resetHasDescriptionAtom();
    resetHasContentAtom();
    resetErrorContentAtom();
    resetImagesHTMlListAtom();
    resetCurrentSubjectCreate();
  }, [
    resetCurrentSubjectCreate,
    resetErrorContentAtom,
    resetErrorImageAtom,
    resetErrorTitleAtom,
    resetFileListAtom,
    resetHasContentAtom,
    resetHasDescriptionAtom,
    resetHasTitleAtom,
    resetImagesHTMlListAtom
  ]);
};
