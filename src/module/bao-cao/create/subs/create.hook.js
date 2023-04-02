import { REPORT_TYPES } from 'module/bao-cao/subs/data';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { disableSubmitAtom, hasDateAtom, hasFileAtom, hasImageAtom, hasTitleAtom } from './create.recoil';

export const useMemoFileList = (mediaList) => {
  const params = useParams();
  const { page } = params;
  const currentReport = useMemo(() => REPORT_TYPES.find((item) => item.route === page), [page]);

  return useMemo(() => {
    if (['thong-tin-tai-chinh', 'quan-tri-doanh-nghiep'].includes(page)) {
      return mediaList?.map((item) => ({ id: item.id, name: item.title, url: item.url }));
    }
    return mediaList
      ?.filter((item) => item.description === currentReport.value)
      ?.map((item) => ({ id: item.id, name: item.title, url: item.url }));
  }, [currentReport.value, mediaList, page]);
};

export const useMemoImageAvatar = (mediaList) => {
  const params = useParams();
  const { page } = params;
  const currentReport = useMemo(() => REPORT_TYPES.find((item) => item.route === page), [page]);

  return useMemo(() => {
    if (['thong-tin-tai-chinh', 'quan-tri-doanh-nghiep'].includes(page)) {
      return [];
    }
    return mediaList
      ?.filter((item) => item.description === `${currentReport.value}-avatar`)
      ?.map((item) => ({ id: item.id, name: item.title, url: item.url }));
  }, [currentReport.value, mediaList, page]);
};

export const useGetActiveSubmit = ({ showDate, showImage }) => {
  const activeTitle = useRecoilValue(hasTitleAtom);
  const activeFile = useRecoilValue(hasFileAtom);
  const hasDate = useRecoilValue(hasDateAtom);
  const hasImage = useRecoilValue(hasImageAtom);
  const activeDate = showDate ? hasDate : true;
  const activeImage = showImage ? hasImage : true;
  return activeTitle && activeFile && activeDate && activeImage;
};

export const useResetAtom = () => {
  const resetDisableSubmit = useResetRecoilState(disableSubmitAtom);
  const resetHasTitle = useResetRecoilState(hasTitleAtom);
  const resetHasFile = useResetRecoilState(hasFileAtom);
  const resetHasImage = useResetRecoilState(hasImageAtom);
  const resetHasDate = useResetRecoilState(hasDateAtom);

  useEffect(() => {
    return () => {
      resetDisableSubmit();
      resetHasTitle();
      resetHasFile();
      resetHasImage();
      resetHasDate();
    };
  }, [resetDisableSubmit, resetHasDate, resetHasFile, resetHasImage, resetHasTitle]);
};
