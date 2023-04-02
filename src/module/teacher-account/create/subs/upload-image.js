import { Flex, Text } from '@chakra-ui/react';
import UploadFile from 'base-component/upload-file';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { imagesListAddedAtom, imagesListAtom, imagesListDeletedAtom } from '../recoil';

const FieldImage = forwardRef((props, ref) => {
  const uploadFileRef = useRef();
  const { fileListUploaded = [] } = props;
  const [error, setError] = useState();

  const setImagesList = useSetRecoilState(imagesListAtom);
  const setImagesAddedList = useSetRecoilState(imagesListAddedAtom);
  const setImagesDeletedList = useSetRecoilState(imagesListDeletedAtom);

  const onError = useCallback((error) => {
    setError(error);
  }, []);

  const onChange = useCallback(
    (value) => {
      setImagesList(value.current);
      setImagesAddedList(value.add);
      setImagesDeletedList(value.delete);
    },
    [setImagesAddedList, setImagesDeletedList, setImagesList]
  );

  useImperativeHandle(ref, () => ({
    get: () => uploadFileRef.current.getFiles(),
    validate: () => uploadFileRef.current.validate(),
    getAdd: () => uploadFileRef.current.getAddedList(),
    getDelete: () => uploadFileRef.current.getDeletedList()
  }));

  return (
    <Flex direction="column" mt={5}>
      <FieldLabel title="Ảnh banner" isRequired />
      <Text color={'#7d858e'} paddingBottom={2}>
        Lưu ý: Thứ tự up ảnh sẽ là thứ tự hiển thị ảnh. (Có thể cập nhật lại thứ tự sau)
      </Text>
      <UploadFile
        isRequired
        fileListUploaded={fileListUploaded}
        ref={uploadFileRef}
        typeFileAccept=".png,.jpg,.jpeg"
        maxUploadFileSize={5}
        onError={onError}
        onChange={onChange}
        previewImage
      />
      {!!error && (
        <Text color="red" mt={0.5}>
          {`${error}`}
        </Text>
      )}
    </Flex>
  );
});

export default memo(FieldImage);
