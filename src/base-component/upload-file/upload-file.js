import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useResetAtom } from './custom-hook';
import { useChangeFileList } from './helper';
import { countChangeAtom, fileListAtom, fileListDeletedAtom } from './recoil';
import PreviewFile from './sub/preview-file';

export default forwardRef((props, ref) => {
  const {
    oneFile,
    typeFileAccept,
    fileListUploaded,
    isRequired,
    customValidate,
    previewImage,
    id,
    maxNumberOfFiles,
    maxUploadFileSize,
    onError,
    onChange
  } = props;
  const [fileList, setFileList] = useRecoilState(fileListAtom(id));
  const [countChange, setCountChange] = useRecoilState(countChangeAtom(id));
  const fileListDeleted = useRecoilValue(fileListDeletedAtom(id));
  const inputRef = useRef();
  const firstTime = useRef(false);

  const [validate, setValidate] = useState(!!fileListUploaded);

  const resetAtom = useResetAtom(id);

  useImperativeHandle(ref, () => ({
    setValues: (newValue) => setFileList(newValue),
    getFiles: () => fileList,
    getDeletedList: () => fileListDeleted,

    getAddedList: () => {
      const listNewAdd = fileList.filter((item) => !fileListUploaded.includes(item));
      return listNewAdd;
    },
    validate: () => {
      if (typeof customValidate === 'function') {
        return customValidate(fileList);
      }
      return validate;
    }
  }));

  useEffect(() => {
    return () => resetAtom();
  }, [resetAtom]);

  useEffect(() => {
    const listNewAdd = fileListUploaded ? fileList.filter((item) => !fileListUploaded.includes(item)) : fileList;
    if (onChange && countChange) {
      onChange({ add: listNewAdd, delete: fileListDeleted, current: fileList });
    }
  }, [countChange, fileList, fileListDeleted, fileListUploaded, onChange]);

  useEffect(() => {
    if (isEmpty(fileList) && firstTime.current) {
      onError('Vui lòng tải file lên');
    } else if (!isEmpty(fileList)) onError('');
  }, [fileList, onError]);

  useEffect(() => {
    if (Array.isArray(fileListUploaded) && fileListUploaded.length > 0 && !firstTime.current) {
      setFileList(fileListUploaded);
      firstTime.current = true;
    }
  }, [fileListUploaded, setFileList]);

  useEffect(() => {
    if (!isRequired) {
      setValidate(true);
      return;
    }
    setValidate(!isEmpty(fileList));
  }, [fileList, isRequired]);

  const onChangeFiles = useChangeFileList(props, setValidate, setCountChange);

  const onClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  return (
    <Flex direction="column" key={id}>
      <Text color={'#7d858e'} paddingBottom={3}>
        {typeFileAccept && <Text as="span">Loại file hỗ trợ: {typeFileAccept}. </Text>}
        {maxNumberOfFiles && <Text as="span">Số lượng file tối đa: {maxNumberOfFiles}. </Text>}
        {maxUploadFileSize && <Text as="span">Dung lượng file tối đa: {maxUploadFileSize}MB.</Text>}
      </Text>
      <Button
        onClick={onClick}
        color="#fff"
        border="2px solid #f7941e"
        bg="#f7941e"
        w={16}
        marginBottom={2}
        _hover={{ bg: '#ec8609' }}
        _active={{
          bg: '#ec8609',
          transform: 'scale(0.98)',
          borderColor: '#bec3c9'
        }}
      >
        Tải lên
      </Button>
      <Input
        type="file"
        multiple={oneFile ? false : true}
        ref={inputRef}
        hidden
        accept={typeFileAccept}
        onChange={onChangeFiles}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      <PreviewFile previewImage={previewImage} id={id} />
    </Flex>
  );
});
