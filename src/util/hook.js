import { useQueryClient } from '@tanstack/react-query';
import Toast from 'base-component/toast';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { userInfoAtom } from 'state-management/user-info';
import { getParentId, getUrlCdn } from 'util/helper';
import { useMutationCreate, useMutationCreateMedia, useMutationDeleteMedia, useMutationUpdate } from 'util/mutate';
import API from './api';
import { getFileNameUpload, paramsToObject } from './helper';
import { useMutationDelete } from './mutate';

export const useUploadFiles = () => {
  return useCallback((files) => {
    return Promise.all(
      files.map((item) => {
        const fileName = getFileNameUpload(item);
        API.upload({
          file: item,
          fileName,
          isImage: item?.type?.startsWith('image/')
        });
        return fileName;
      })
    ).catch((e) => {
      Toast.show({
        status: 'error',
        description: `Lỗi: ${e.message || 'Không thể tải file lên'}`
      });
    });
  }, []);
};

export const useGetMediaWithParent = () =>
  useCallback(
    (parentId) =>
      API.request({
        url: '/solr/media/select',
        params: {
          q: `parentId:${parentId}`
        }
      }),
    []
  );

export const useDeleteFiles = () => {
  return useCallback((urls) => {
    return Promise.all(
      urls.map((item) => {
        return API.upload({
          method: 'DELETE',
          url: item
        });
      })
    ).catch((e) => {
      Toast.show({
        status: 'error',
        description: `Lỗi: ${e.message || 'Không thể xoá file trên CDN'}`
      });
    });
  }, []);
};

const useCreateSuccess = (data) => {
  const { setIsLoading, setError } = data;
  const {
    mutate: createMediaMutate,
    isLoading: loadingCreateMedia,
    error: errorCreateMedia
  } = useMutationCreateMedia();

  useEffect(() => setIsLoading(loadingCreateMedia), [loadingCreateMedia, setIsLoading]);
  useEffect(() => setError(errorCreateMedia), [errorCreateMedia, setError]);

  return useCallback(
    async (values) => {
      const { fileData, createdDate, fileNameList, solrTable, onSuccess } = values;
      const parentId = await getParentId({ url: `/solr/${solrTable}/select`, createdDate });

      await Promise.all(
        fileData.map((item, index) => {
          const { file, description } = item;
          const params = {
            url: getUrlCdn(fileNameList[index]),
            parentId,
            title: file.name,
            description
          };
          return createMediaMutate({
            params,
            onSuccess
          });
        })
      ).catch((e) => {
        setError(e);
        Toast.show({
          status: 'error',
          description: 'Không thể thêm dữ liệu media'
        });
      });
    },
    [createMediaMutate, setError]
  );
};

export const useCreateWithMedia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const uploadFileCdn = useUploadFiles();
  const onCreateSuccess = useCreateSuccess({ setIsLoading, setError });
  const { mutate: createMutate, isLoading: loadingCreate, error: errorCreate } = useMutationCreate();

  useEffect(() => setIsLoading(loadingCreate), [loadingCreate]);
  useEffect(() => setError(errorCreate), [errorCreate]);

  return {
    error,
    isLoading,
    createWithMedia: (values) => {
      const { params, solrTable, createdDate, fileData, onSuccess, method, showToast } = values;
      const files = fileData.map((item) => item.file);

      if (isEmpty(files)) {
        const data = {
          url: `/solr/${solrTable}/update`,
          params,
          onSuccess,
          method,
          showToast
        };
        createMutate(data);
        return;
      }

      uploadFileCdn(files).then((fileNameList) => {
        const data = {
          url: `/solr/${solrTable}/update`,
          params,
          onSuccess: () => onCreateSuccess({ fileData, createdDate, fileNameList, solrTable, onSuccess }),
          method,
          showToast
        };
        createMutate(data);
      });
    }
  };
};

export const useUpdateWithMedia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteFileCdn = useDeleteFiles();
  const uploadFileCdn = useUploadFiles();
  const { mutate: updateMutate, isLoading: loadingUpdate, error: errorUpdate } = useMutationUpdate();
  const {
    mutate: deleteMediaMutate,
    isLoading: loadingDeleteMedia,
    error: errorDeleteMedia
  } = useMutationDeleteMedia();
  const {
    mutate: createMediaMutate,
    isLoading: loadingCreateMedia,
    error: errorCreateMedia
  } = useMutationCreateMedia();

  useEffect(
    () => setIsLoading(loadingUpdate || loadingCreateMedia || loadingDeleteMedia),
    [loadingCreateMedia, loadingDeleteMedia, loadingUpdate]
  );

  useEffect(
    () => setError(errorUpdate || errorCreateMedia || errorDeleteMedia),
    [errorCreateMedia, errorDeleteMedia, errorUpdate]
  );

  return {
    error,
    isLoading,
    updateWithMedia: (values) => {
      const { solrTable, params, fileData, onSuccess, method, showToast, parentId } = values || {};
      const { add: addFile, delete: deleteFile } = fileData;
      const allFileAdd = addFile.map((item) => item.file);
      const allFileDelete = deleteFile.map((item) => item.file);
      const noFileAdd = !Array.isArray(allFileAdd) || !allFileAdd.length || allFileAdd.every((i) => !i);

      new Promise((resolve) => {
        if (!Array.isArray(allFileDelete) || !allFileDelete.length || allFileDelete.every((i) => !i)) {
          resolve();
          return;
        } else {
          const urlDelete = allFileDelete.map((item) => item.url.replace('/upload/', '/imgview'));
          const idDelete = allFileDelete.map((item) => item.id);
          deleteFileCdn(urlDelete).then(() => deleteMediaMutate({ id: idDelete, onSuccess: () => resolve() }));
        }
      })
        .then(async () => {
          if (noFileAdd) {
            return;
          }
          await uploadFileCdn(allFileAdd).then(async (fileNameList) => {
            await Promise.all(
              addFile.map(async (item, index) => {
                const { file, description } = item;
                const fileName = fileNameList[index];
                await createMediaMutate({
                  params: {
                    url: getUrlCdn(fileName),
                    parentId: parentId || params.id,
                    title: file.name,
                    description
                  }
                });
              })
            );
          });
        })
        .then(() => {
          const data = {
            url: `/solr/${solrTable}/update`,
            params,
            onSuccess,
            method,
            showToast
          };

          updateMutate(data);
        });
    }
  };
};

const useDeleteSuccess = ({ setIsLoading, tableQueryKey, setError }) => {
  const queryClient = useQueryClient();
  const getMediaWithParent = useGetMediaWithParent();
  const {
    mutate: deleteMediaMutate,
    isLoading: loadingDeleteMedia,
    error: errorDeleteMedia
  } = useMutationDeleteMedia();
  const deleteFileCdn = useDeleteFiles();

  const onDeleteFileCdn = useCallback(
    (urls, disableRefresh) => {
      deleteFileCdn(urls).then(() => {
        !disableRefresh && queryClient.invalidateQueries(tableQueryKey);
      });
    },
    [deleteFileCdn, queryClient, tableQueryKey]
  );

  useEffect(() => setIsLoading(loadingDeleteMedia), [loadingDeleteMedia, setIsLoading]);
  useEffect(() => setError(errorDeleteMedia), [errorDeleteMedia, setError]);

  return useCallback(
    async (parentId, onSuccess, disableRefresh) => {
      const mediaWithParent = await getMediaWithParent(parentId);
      if (Array.isArray(mediaWithParent) && !!mediaWithParent.length) {
        const cdnUrls = mediaWithParent.map((item) => item.url);
        deleteMediaMutate({
          id: mediaWithParent.map((item) => item.id),
          onSuccess: () => {
            onDeleteFileCdn(cdnUrls, disableRefresh);
            onSuccess && onSuccess();
          }
        });
      } else {
        onSuccess && onSuccess();
        !disableRefresh && queryClient.invalidateQueries(tableQueryKey);
      }
    },
    [deleteMediaMutate, getMediaWithParent, onDeleteFileCdn, queryClient, tableQueryKey]
  );
};

export const useDeleteWithMedia = (tableQueryKey) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const onDeleteSuccess = useDeleteSuccess({ setIsLoading, tableQueryKey, setError });

  const { mutate: deleteMutate, isLoading: loadingDelete, error: errorDelete } = useMutationDelete(tableQueryKey);

  useEffect(() => setIsLoading(loadingDelete), [loadingDelete]);
  useEffect(() => setError(errorDelete), [errorDelete]);

  return {
    error,
    isLoading,
    deleteWithMedia: (values) => {
      const { id, solrTable, showToast, onSuccess, disableRefresh } = values;
      return deleteMutate({
        url: `/solr/${solrTable}/update`,
        id,
        onSuccess: () => onDeleteSuccess(id, onSuccess, disableRefresh),
        showToast
      });
    }
  };
};

export const useSetParamURL = () => {
  const setSearchParams = useSearchParams()[1];

  return useCallback(
    (key, value) =>
      setSearchParams((curr) => {
        const newParams = paramsToObject(curr.entries());
        newParams[key] = value;
        return new URLSearchParams(newParams);
      }),
    [setSearchParams]
  );
};

export const useGetParamsURL = () => {
  const location = useLocation();
  return useCallback(() => queryString.parse(location.search), [location.search]);
};

export const useScrollTop = () => useEffect(() => window.scrollTo(0, 0), []);

export const useSetUserInfo = (userInfo) => {
  const setUserInfo = useSetRecoilState(userInfoAtom);

  useEffect(() => {
    if (userInfo) {
      const {
        id,
        username,
        password,
        fullName,
        role,
        status,
        avatar,
        school,
        address,
        phone,
        gender,
        followers,
        following,
        numOfExam
      } = userInfo;

      setUserInfo({
        id,
        username,
        password,
        fullName,
        role,
        status,
        avatar,
        school,
        address,
        phone,
        gender,
        followers,
        following,
        numOfExam
      });
    }
  }, [setUserInfo, userInfo]);
};

export const useSetSubject = (subject) => {
  const setSubject = useSetRecoilState(subjectAtom);

  useEffect(() => {
    if (subject) {
      setSubject(subject);
    }
  }, [setSubject, subject]);
};
