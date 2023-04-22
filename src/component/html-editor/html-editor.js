import { Flex, Heading } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
import { LoadingScreen } from 'component/effect-screen';
import parse from 'html-react-parser';

import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loadingUploadImageAtom } from 'state-management/loading-upload-image';
import { useUploadImage } from 'util/mutate';
import './html-editor.css';

const HtmlEditor = forwardRef((props, ref) => {
  const editorRef = useRef();
  const { onChange, onChangeText, defaultHtml, image } = props;
  const [content, setContent] = useState('');

  // const [ckData, setCkData] = useState('');

  const onUploadImage = useUploadImage();

  const loadingUploadImage = useRecoilValue(loadingUploadImageAtom);

  const onChangeData = useCallback((event, editor) => {
    const data = editor.getData();
    setContent(data);
    // const html = editorRef.current?.getInstance()?.getHTML();
    // onChange && onChange(html);
    // const temp = document.createElement('div');
    // temp.innerHTML = html;
    // setContent(temp.textContent);
    // onChangeText && onChangeText(temp.textContent);
  }, []);

  useImperativeHandle(ref, () => ({
    getHtml: () => {
      if (!content) {
        return '';
      }
      return content;
      // return editorRef.current?.getInstance()?.getHTML();
    },
    setHtml: (value) => {
      editorRef.current?.getInstance()?.setHTML(value);
    },
    getContent: () => content
  }));

  return (
    <Flex direction="column" w="full" gap={4}>
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

      {/* <ToastEditor
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
      /> */}

      <CKEditor
        ref={editorRef}
        editor={ClassicEditor}
        config={{
          toolbar: {
            shouldNotGroupWhenFull: true,
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              // 'underline',
              // 'strikethrough',
              '|',
              'bulletedList',
              'numberedList',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo',
              '|',
              'MathType',
              'ChemType'
            ]
          },
          image: {
            hooks: {
              addImageBlobHook: onUploadImage
            }
          }
        }}
        data={content}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log( 'Editor is ready to use!', editor );
        }}
        onChange={onChangeData}
      />
      {content && (
        <Flex direction="column" border={'1px dashed #F7941D'} borderRadius="5px" padding={'10px'} gap={4}>
          <Heading as="h3" fontSize={'22px'}>
            Hiển thị
          </Heading>
          {parse(content)}
        </Flex>
      )}
    </Flex>
  );
});

export default memo(HtmlEditor);
