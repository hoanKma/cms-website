import { Flex } from '@chakra-ui/react';
import FieldLabel from 'component/field-label';
import HtmlEditor from 'component/html-editor';
import { parse as parseHtml } from 'node-html-parser';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { errorContentAtom, hasContentAtom, imagesHTMlListAtom } from '../recoil';

const FieldContent = forwardRef((_, ref) => {
  const params = useParams();
  const { id } = params;
  const editorRef = useRef();

  const setImagesInBlog = useSetRecoilState(imagesHTMlListAtom);
  const setHasContentAtom = useSetRecoilState(hasContentAtom);
  const setErrorContent = useSetRecoilState(errorContentAtom);

  const [defaultHtml, setDefaultHtml] = useState(id ? undefined : '');

  const onChange = useCallback(
    (text) => {
      const rawHtml = parseHtml(text);
      const imgElements = rawHtml.querySelectorAll('img') || [];
      const imageUrls = imgElements.map((item) => item.attrs.src);

      setImagesInBlog(imageUrls);
      setHasContentAtom(!!rawHtml.innerText);
      setErrorContent(!rawHtml.innerText.trim());
    },
    [setErrorContent, setHasContentAtom, setImagesInBlog]
  );

  useImperativeHandle(ref, () => ({
    getHtml: () => editorRef.current.getHtml(),
    setHtml: (value) => setDefaultHtml(value || ''),
    getContent: () => editorRef.current.getContent()
  }));

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title={'Giải thích'} isRequired />

      {typeof defaultHtml !== 'undefined' && (
        <HtmlEditor ref={editorRef} onChangeText={onChange} defaultHtml={defaultHtml} image />
      )}
    </Flex>
  );
});

export default memo(FieldContent);
