import { Flex, Text } from '@chakra-ui/react';
import UploadFile from 'base-component/upload-file';
import FieldLabel from 'component/field-label';
import { isEmpty } from 'lodash';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useMutationUploadImage } from 'util/mutate';

const Avatar = forwardRef((props, ref) => {
  const uploadFileRef = useRef();
  const { fileListUploaded = [] } = props;
  const [error, setError] = useState();
  const [abc, setAbc] = useState(false);

  const { mutate: uploadImage, data: avatarUrl } = useMutationUploadImage();

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(
    (e) => {
      if (!isEmpty(e.current) && !abc) {
        uploadImage({ file: e.current[0] });
        setAbc(true);
      }
    },
    [abc, uploadImage]
  );

  useImperativeHandle(ref, () => ({
    get: () => uploadFileRef.current.getFiles(),
    validate: () => uploadFileRef.current.validate(),
    getAdd: () => uploadFileRef.current.getAddedList(),
    getDelete: () => uploadFileRef.current.getDeletedList(),
    getAva: () => avatarUrl
  }));

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title="Ảnh đại diện" isRequired />
      <UploadFile
        isRequired
        oneFile
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

export default memo(Avatar);
