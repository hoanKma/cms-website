import { Flex, Text } from '@chakra-ui/react';
import UploadFile from 'base-component/upload-file';
import FieldLabel from 'component/field-label';
import isEmpty from 'lodash/isEmpty';
import { DISABLE_MULTI_UPFILE } from 'module/bao-cao/subs/data';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { disableSubmitAtom, hasFileAtom } from './create.recoil';

const FieldUpload = forwardRef((props, ref) => {
  const { fileListUploaded } = props;
  const uploadFileRef = useRef();
  const [error, setError] = useState();
  const params = useParams();
  const { page, id } = params;
  const setHasFile = useSetRecoilState(hasFileAtom);
  const setDisableSubmit = useSetRecoilState(disableSubmitAtom);

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(
    (e) => {
      const hasFile = !isEmpty(e.current);
      if (id) {
        setDisableSubmit(!hasFile);
      }
      setHasFile(hasFile);
    },
    [id, setDisableSubmit, setHasFile]
  );

  useImperativeHandle(ref, () => ({
    get: () => uploadFileRef.current.getFiles(),
    getAdd: () => uploadFileRef.current.getAddedList(),
    getDelete: () => uploadFileRef.current.getDeletedList(),
    validate: () => uploadFileRef.current.validate()
  }));

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title="File đính kèm" isRequired oneFile />
      <UploadFile
        oneFile={DISABLE_MULTI_UPFILE.includes(page)}
        isRequired
        onChange={onChange}
        ref={uploadFileRef}
        fileListUploaded={fileListUploaded}
        typeFileAccept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
        maxUploadFileSize={25}
        onError={onError}
      />
      {!!error && (
        <Text color="red" mt={0.5}>
          {`${error}`}
        </Text>
      )}
    </Flex>
  );
});

export default memo(FieldUpload);
