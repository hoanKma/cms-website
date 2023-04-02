import { Flex } from '@chakra-ui/react';
import FieldLabel from 'component/field-label';
import HtmlEditor from 'component/html-editor';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { disableSubmitAtom } from './create.recoil';

const FieldDescription = forwardRef((_, ref) => {
  const editorRef = useRef();
  const params = useParams();
  const { id } = params;
  const [defaultHtml, setDefaultHtml] = useState(id ? undefined : '');
  const setDisableSubmit = useSetRecoilState(disableSubmitAtom);

  const onChange = useCallback(
    (text) => {
      if (id) {
        setDisableSubmit(false);
      }
    },
    [id, setDisableSubmit]
  );

  useImperativeHandle(ref, () => ({
    getHtml: () => editorRef.current.getHtml(),
    setHtml: (value) => setDefaultHtml(value || ''),
    getContent: () => editorRef.current.getContent()
  }));

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title="Mô tả" />
      {typeof defaultHtml !== 'undefined' && (
        <HtmlEditor ref={editorRef} onChangeText={onChange} defaultHtml={defaultHtml} />
      )}
    </Flex>
  );
});

export default memo(FieldDescription);
