import { Flex } from '@chakra-ui/react';
import { ButtonBack, ButtonSubmit } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useCreateWithMedia, useUpdateWithMedia } from 'util/hook';
import { useQueryDetail, useQueryMedia } from 'util/query';
import { useResetAtom } from './custom-hook';
import { imagesListAddedAtom, imagesListAtom, imagesListDeletedAtom, valueUrlAtom } from './recoil';

import FieldScreen from './subs/input-screen';

const TeacherAccountCreate = () => {
  const imageRef = useRef();
  const urlRef = useRef();
  const params = useParams();
  const { id, page } = params;
  const navigate = useNavigate();

  const [disable, setDisable] = useState(true);
  const [enableStatus, setEnableStatus] = useState(true);

  const valueUrl = useRecoilValue(valueUrlAtom);
  const imagesList = useRecoilValue(imagesListAtom);
  const imagesListAdded = useRecoilValue(imagesListAddedAtom);
  const imagesListDeleted = useRecoilValue(imagesListDeletedAtom);

  const resetAtom = useResetAtom();

  const {
    isLoading: loadingDetail,
    data: infoDetail,
    error
  } = useQueryDetail(['GET_BANNER_DETAIL', page], `/solr/banner/select`, id);
  const { data: mediaList, error: errorMedia } = useQueryMedia(id);
  const { isLoading: loadingCreate, createWithMedia } = useCreateWithMedia();
  const { isLoading: loadingUpdate, updateWithMedia } = useUpdateWithMedia();

  const loadingAction = useMemo(() => loadingCreate || loadingUpdate, [loadingCreate, loadingUpdate]);

  useEffect(() => {
    resetAtom();
  }, [resetAtom]);

  useEffect(() => {
    setEnableStatus(infoDetail?.enable);
  }, [infoDetail?.enable, resetAtom]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const images = imageRef?.current?.get();
      const url = urlRef.current.get();
      const created_date = dayjs().valueOf();

      if (id) {
        // update
        const params = {
          id,
          url,
          created_date: infoDetail?.created_date,
          updated_date: created_date,
          fileNum: images.length,
          enable: enableStatus
        };
        const imagesAdd = imageRef?.current?.getAdd();
        const imagesDelete = imageRef?.current?.getDelete();

        const fileDataAdd = imagesAdd?.map((item, index) => {
          return {
            file: item,
            description: images[images.length]?.description + index
          };
        });

        const fileData = {
          add: fileDataAdd,
          delete: imagesDelete?.map((item) => ({ file: item }))
        };

        updateWithMedia({
          solrTable: 'banner',
          params,
          fileData,
          onSuccess: () => navigate(`/banners`)
        });
      } else {
        //add
        const params = {
          url,
          created_date,
          fileNum: images.length,
          enable: enableStatus
        };
        const fileData = images.map((item, index) => {
          return {
            file: item,
            description: index
          };
        });

        createWithMedia({
          params,
          solrTable: 'banner',
          createdDate: created_date,
          fileData,
          onSuccess: () => navigate(`/banners`)
        });
      }
    },
    [createWithMedia, enableStatus, id, infoDetail?.created_date, navigate, updateWithMedia]
  );

  useEffect(() => {
    if (infoDetail && id) {
      const { url } = infoDetail;
      urlRef.current?.set(url);
    }
  }, [id, infoDetail]);

  useEffect(() => {
    if (!id) {
      setDisable(!valueUrl || isEmpty(imagesList));
    } else {
      const statusImage = (isEmpty(imagesListDeleted) && isEmpty(imagesListAdded)) || isEmpty(imagesList);
      const statusTick = enableStatus === infoDetail?.enable || (Array.isArray(imagesList) && imagesList?.length === 0);
      const statusValueUrl = !valueUrl || (Array.isArray(imagesList) && imagesList?.length === 0);

      setDisable(statusValueUrl && statusTick && statusImage);
    }
  }, [enableStatus, id, imagesList, imagesListAdded, imagesListDeleted, infoDetail?.enable, valueUrl]);

  const onChangeSwitch = useCallback((e) => {
    setEnableStatus(e.target.checked);
  }, []);

  if (id) {
    if (loadingDetail) {
      return <LoadingScreen />;
    }

    if (error || errorMedia || !infoDetail) {
      return <ErrorScreen message={error.message} />;
    }
  }

  return (
    <Flex w="full">
      <Flex w={2 / 3} mx="auto" mt={10} flexDirection="column">
        <form onSubmit={onSubmit}>
          <FieldScreen ref={urlRef} />

          <Flex justifyContent="center" mt={5} mb={10} gap={4}>
            <Link to="/banners">
              <ButtonBack />
            </Link>
            <ButtonSubmit title={id ? 'Cập nhật' : 'Tạo mới'} isLoading={loadingAction} isDisabled={disable} />
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default memo(TeacherAccountCreate);
