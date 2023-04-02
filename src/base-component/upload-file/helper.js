import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { countChangeAtom, fileListAtom, fileListDeletedAtom, fileListRejectAtom } from './recoil';

export const useChangeFileList = (props, setValidate) => {
  const { typeFileAccept = '*', maxNumberOfFiles = 999, maxUploadFileSize, id, isRequired, oneFile } = props;

  const [fileList, setFileList] = useRecoilState(fileListAtom(id));
  const setCountChange = useSetRecoilState(countChangeAtom(id));
  const setFileListReject = useSetRecoilState(fileListRejectAtom(id));
  const [fileListDeleted, setFileListDeleted] = useRecoilState(fileListDeletedAtom(id));

  return useCallback(
    (e) => {
      const targetFiles = e.target.files;

      const maxNumberOfFilesToFloat = parseFloat(maxNumberOfFiles);
      const maxUploadFileSizeToFloat = parseFloat(maxUploadFileSize);

      const files = Object.entries(targetFiles).map(([_, value]) => value);
      let allFile;
      if (oneFile) {
        allFile = [...files];
        if (!isEmpty(fileList) && isEmpty(fileListDeleted)) {
          setFileListDeleted(fileList);
        }
      } else {
        allFile = [...fileList, ...files];
      }

      // dung lượng tối đa mỗi file :  maxUploadFileSizeToFloat (mb)
      // loại file được chấp nhận : typeFileAccept

      const arrInValidSize = [];
      const arrInValidType = [];
      const arrInValidLength = [];
      const arrValid = [];

      allFile.forEach((item) => {
        let checkInvalid = true;
        let fileExtension = '';
        if (item?.url) {
          fileExtension = item.url.split('.').slice(-1)[0];
        } else {
          fileExtension = item.name.split('.').slice(-1)[0];
        }
        if (typeFileAccept !== '*' && !typeFileAccept.includes(fileExtension)) {
          arrInValidType.push({ 'Loại file không hỗ trợ': item });
          checkInvalid = false;
        }
        if (item.size > maxUploadFileSizeToFloat * 1048576) {
          arrInValidSize.push({ 'Quá dung lượng tối đa': item });
          checkInvalid = false;
        }

        if (checkInvalid && arrValid.length < maxNumberOfFilesToFloat) {
          arrValid.push(item);
        } else {
          if (checkInvalid) {
            arrInValidLength.push({ 'Quá số lượng tối đa': item });
          }
        }
      });

      setFileList(arrValid);

      setFileListReject([...arrInValidType, ...arrInValidSize, ...arrInValidLength]);

      setCountChange((current) => current + 1);

      if (typeof customValidate === 'function') {
        return;
      }

      if (!isRequired) {
        setValidate(true);

        return;
      }

      if (!isEmpty(e)) {
        setValidate(true);

        return;
      }
      setValidate(false);
    },
    [
      fileList,
      fileListDeleted,
      isRequired,
      maxNumberOfFiles,
      maxUploadFileSize,
      oneFile,
      setCountChange,
      setFileList,
      setFileListDeleted,
      setFileListReject,
      setValidate,
      typeFileAccept
    ]
  );
};
