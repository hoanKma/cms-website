import { Flex } from '@chakra-ui/react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { LoadingScreen } from 'component/effect-screen';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loadingUploadImageAtom } from 'state-management/loading-upload-image';
import { useUploadImage } from 'util/mutate';
import './html-editor.css';

const HtmlEditor = forwardRef((props, ref) => {
  const editorRef = useRef();
  const { onChange, onChangeText, defaultHtml, image } = props;
  const [content, setContent] = useState();

  const onUploadImage = useUploadImage();

  const loadingUploadImage = useRecoilValue(loadingUploadImageAtom);

  const onChangeData = useCallback(() => {
    const html = editorRef.current?.getInstance()?.getHTML();
    onChange && onChange(html);
    const temp = document.createElement('div');
    temp.innerHTML = html;
    setContent(temp.textContent);
    onChangeText && onChangeText(temp.textContent);
  }, [onChange, onChangeText]);

  useImperativeHandle(ref, () => ({
    getHtml: () => {
      if (!content) {
        return '';
      }
      return editorRef.current?.getInstance()?.getHTML();
    },
    setHtml: (value) => {
      editorRef.current?.getInstance()?.setHTML(value);
    },
    getContent: () => content
  }));

  return (
    <Flex direction="column" w="full">
      {loadingUploadImage && (
        <Flex
          w="full"
          h="100%"
          position="absolute"
          top={0}
          left={0}
          zIndex={50}
          bgColor="#00000038"
          alignItems="center"
          justifyContent="center"
        >
          <LoadingScreen />
        </Flex>
      )}

      <ToastEditor
        height="400px"
        usageStatistics={false}
        autofocus={false}
        initialEditType="wysiwyg"
        placeholder="Viết mô tả"
        hooks={{ addImageBlobHook: onUploadImage }}
        initialValue={defaultHtml || ' '}
        ref={editorRef}
        toolbarItems={
          image
            ? [['heading', 'bold', 'italic', 'ul', 'ol', 'link', 'image']]
            : [['heading', 'bold', 'italic', 'ul', 'ol', 'link']]
        }
        onChange={onChangeData}
      />
    </Flex>
  );
});

export default memo(HtmlEditor);
