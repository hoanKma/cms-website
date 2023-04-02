import { Flex, Text } from '@chakra-ui/react';
import UploadFile from 'base-component/upload-file';
import FieldLabel from 'component/field-label';
import isEmpty from 'lodash/isEmpty';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { disableSubmitAtom, hasImageAtom } from './create.recoil';

const FieldImage = forwardRef((props, ref) => {
  const uploadFileRef = useRef();
  const { fileListUploaded = [] } = props;
  const [error, setError] = useState();
  const setHasImage = useSetRecoilState(hasImageAtom);
  const params = useParams();
  const { id } = params;
  const setDisableSubmit = useSetRecoilState(disableSubmitAtom);

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(
    (e) => {
      const hasImage = !isEmpty(e.current);
      if (id) {
        setDisableSubmit(!hasImage);
      }
      setHasImage(hasImage);
    },
    [id, setDisableSubmit, setHasImage]
  );

  useImperativeHandle(ref, () => ({
    get: () => uploadFileRef.current.getFiles(),
    validate: () => uploadFileRef.current.validate(),
    getAdd: () => uploadFileRef.current.getAddedList(),
    getDelete: () => uploadFileRef.current.getDeletedList()
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
