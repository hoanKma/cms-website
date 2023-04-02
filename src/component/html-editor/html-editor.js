import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import './html-editor.css';

const HtmlEditor = forwardRef((props, ref) => {
  const editorRef = useRef();
  const { onChange, onChangeText, defaultHtml, image } = props;
  const [content, setContent] = useState();

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
    <ToastEditor
      height="400px"
      usageStatistics={false}
      autofocus={false}
      initialEditType="wysiwyg"
      placeholder="Viết mô tả"
      // hooks={{ addImageBlobHook: onUploadImage }}
      initialValue={defaultHtml || ' '}
      ref={editorRef}
      toolbarItems={
        image
          ? [['heading', 'bold', 'italic', 'ul', 'ol', 'link', 'image']]
          : [['heading', 'bold', 'italic', 'ul', 'ol', 'link']]
      }
      onChange={onChangeData}
    />
  );
});

export default memo(HtmlEditor);
