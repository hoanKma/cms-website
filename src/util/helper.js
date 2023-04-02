import Toast from 'base-component/toast';
import dayjs from 'dayjs';
import get from 'lodash/get';
import API from './api';

export const getParamFromUrl = (key) => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  return params.get(key);
};

export const paramsToObject = (entries) => {
  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

export const getFileNameUpload = (file) => `${dayjs().valueOf()}_${file.name}`;

export const getUrlCdn = (fileName) => `${process.env.REACT_APP_CDN}/imgview/${fileName}`;

export const getParentId = ({ url, createdDate }) =>
  API.request({
    url,
    params: {
      q: `created_date:${createdDate}`
    }
  })
    .then((response) => get(response, '0.id'))
    .catch((e) =>
      Toast.show({
        status: 'error',
        content: `Lỗi: ${e.message || 'Không thể lấy id vừa tạo'}`
      })
    );

export const getUploadFileError = (e) =>
  Object.entries(e)
    .map((item) => item[1])
    .flat()
    .join('. ');

export const getKeywordSearch = (keyword) => `*${keyword.trim().split(' ').join('* *')}*`;
