import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonBack, ButtonSubmit } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useCreateWithMedia, useUpdateWithMedia } from 'util/hook';
import { useQueryDetail, useQueryMedia } from 'util/query';
import {
  DISABLE_DATE_ROUTES,
  REPORT_TYPES,
  SHOW_DESCRIPTION_ROUTES,
  SHOW_IMAGE_ROUTES,
  SHOW_TYPE_ROUTES,
  SHOW_YEAR_ROUTES
} from '../subs/data';
import { useGetActiveSubmit, useMemoFileList, useMemoImageAvatar, useResetAtom } from './subs/create.hook';
import { disableSubmitAtom } from './subs/create.recoil';
import FieldDescription from './subs/input-description';
import FieldTitle from './subs/input-title';
import FieldDate from './subs/select-date';
import FieldType from './subs/select-type';
import FieldYear from './subs/select-year';
import FieldUpload from './subs/upload-file';
import FieldImage from './subs/upload-image';

const ReportCreate = () => {
  const fileRef = useRef();
  const imageRef = useRef();
  const titleRef = useRef();
  const dateRef = useRef();
  const typeRef = useRef();
  const yearRef = useRef();
  const descriptionRef = useRef();
  const params = useParams();
  const { id, page } = params;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLoading: loadingDetail,
    data: infoDetail,
    error
  } = useQueryDetail(['GET_REPORT_DETAIL', page], `/solr/report/select`, id);
  const { data: mediaList, error: errorMedia } = useQueryMedia(id);
  const { isLoading: loadingCreate, createWithMedia, error: errorCreate } = useCreateWithMedia();
  const { isLoading: loadingUpdate, updateWithMedia, error: errorUpdate } = useUpdateWithMedia();
  const showDescription = useMemo(() => SHOW_DESCRIPTION_ROUTES.includes(page), [page]);
  const showDate = useMemo(() => !DISABLE_DATE_ROUTES.includes(page), [page]);
  const showYear = useMemo(() => SHOW_YEAR_ROUTES.includes(page), [page]);
  const showImage = useMemo(() => SHOW_IMAGE_ROUTES.includes(page), [page]);
  const showType = useMemo(() => SHOW_TYPE_ROUTES.includes(page), [page]);
  const imageAvatar = useMemoImageAvatar(mediaList);
  const fileList = useMemoFileList(mediaList);
  const loadingAction = useMemo(() => loadingCreate || loadingUpdate, [loadingCreate, loadingUpdate]);
  const errorAction = useMemo(() => errorCreate || errorUpdate, [errorCreate, errorUpdate]);
  const activeSubmit = useGetActiveSubmit({ showDate, showImage });
  const [disableSubmit, setDisableSubmit] = useRecoilState(disableSubmitAtom);

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  const validateForm = useCallback(() => {
    const validTitle = titleRef.current.validate();
    if (!validTitle) {
      return false;
    }
    const validFile = fileRef.current.validate();
    if (!validFile) {
      return false;
    }
    if (showImage) {
      const validImage = fileRef.current.validate();
      if (!validImage) {
        return false;
      }
    }
    if (showType) {
      const validType = typeRef.current.validate();
      if (!validType) {
        return false;
      }
    }
    if (showYear) {
      const validYear = yearRef.current.validate();
      if (!validYear) {
        return false;
      }
    }
    if (showDate) {
      const validDate = dateRef.current.validate();
      if (!validDate) {
        return false;
      }
    }
    return true;
  }, [showDate, showImage, showType, showYear]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const files = fileRef.current.get();
      const images = imageRef?.current?.get();
      const title = titleRef.current.get();
      const date = dateRef?.current?.get();
      const type = typeRef?.current?.get()?.value || REPORT_TYPES.find((item) => item.route === page).value;
      const more_info = yearRef?.current?.get()?.value;
      const description = descriptionRef?.current?.getHtml();
      const created_date = dayjs().valueOf();
      const updated_date = dayjs().valueOf();

      if (!validateForm()) {
        return;
      }

      if (id) {
        // update
        const params = {
          id,
          title,
          type,
          date,
          description,
          more_info,
          created_date: infoDetail?.created_date,
          updated_date,
          fileNum: Array.isArray(files) ? files.length : 0
        };
        const filesAdd = fileRef.current.getAdd();
        const filesDelete = fileRef.current.getDelete();
        const imagesAdd = imageRef?.current?.getAdd();
        const imagesDelete = imageRef?.current?.getDelete();
        const allFileDelete = showImage ? [...imagesDelete, ...filesDelete] : filesDelete;
        const allFileAdd = showImage ? [...imagesAdd, ...filesAdd] : filesAdd;

        const fileDataAdd = allFileAdd?.map((item) => {
          if (item.type.startsWith('image/')) {
            return {
              file: item,
              description: `${type}-avatar`
            };
          }
          return { file: item, description: type };
        });

        const fileData = {
          add: fileDataAdd,
          delete: allFileDelete?.map((item) => ({ file: item }))
        };

        updateWithMedia({
          solrTable: 'report',
          params,
          fileData,
          onSuccess: () => onGoBack()
        });
      } else {
        //add
        const fileList = showImage ? [...images, ...files] : files;
        const params = {
          title,
          type,
          date,
          description,
          created_date,
          more_info,
          updated_date,
          fileNum: Array.isArray(files) ? files.length : 0
        };
        const fileData = fileList.map((item) => {
          if (item.type.startsWith('image/')) {
            return {
              file: item,
              description: `${type}-avatar`
            };
          }
          return { file: item, description: type };
        });

        createWithMedia({
          params,
          solrTable: 'report',
          createdDate: created_date,
          fileData,
          onSuccess: () => onGoBack()
        });
      }
    },
    [createWithMedia, id, infoDetail?.created_date, onGoBack, page, showImage, updateWithMedia, validateForm]
  );

  useEffect(() => setDisableSubmit(!activeSubmit), [activeSubmit, setDisableSubmit]);

  useResetAtom();

  useEffect(() => {
    return () => queryClient.removeQueries(['GET_REPORT_DETAIL']);
  }, [queryClient]);

  useEffect(() => {
    if (infoDetail && id) {
      setDisableSubmit(true);
      const { title, date, description, more_info, type } = infoDetail;
      titleRef.current?.set(title);
      showDate && dateRef.current.set(date);
      showDescription && descriptionRef.current.setHtml(description);
      showYear && yearRef.current.set({ value: more_info, label: more_info });
      showType && typeRef.current.set(type);
    }
  }, [id, infoDetail, setDisableSubmit, showDate, showDescription, showImage, showType, showYear]);

  if (id) {
    if (loadingDetail) {
      return <LoadingScreen />;
    }

    if (error || errorMedia || !infoDetail) {
      return <ErrorScreen message={error?.message} />;
    }
  }

  return (
    <Flex w="full">
      <Flex w={2 / 3} mx="auto" mt={10} flexDirection="column">
        <form onSubmit={onSubmit}>
          <FieldTitle ref={titleRef} />
          {showType && <FieldType ref={typeRef} />}
          {showYear && <FieldYear ref={yearRef} />}
          <FieldUpload ref={fileRef} fileListUploaded={fileList} />
          {showImage && <FieldImage ref={imageRef} fileListUploaded={imageAvatar} />}
          {showDate && <FieldDate ref={dateRef} />}

          {showDescription && <FieldDescription ref={descriptionRef} />}

          {errorAction && (
            <Flex justify="center" mt={12}>
              <Text color="red">Lỗi: {errorAction.message}</Text>
            </Flex>
          )}

          <Flex justifyContent="center" mt={16} mb={10} gap={10}>
            <ButtonBack onClick={onGoBack} />

            <ButtonSubmit title={id ? 'Cập nhật' : 'Tạo mới'} isLoading={loadingAction} isDisabled={disableSubmit} />
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default memo(ReportCreate);
