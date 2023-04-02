import UploadFile from 'base-component/upload-file/upload-file';
import { useRef } from 'react';

const UploadFileDemo = () => {
  const fileListUploaded = [];
  const uploadFileRef = useRef();

  return (
    <UploadFile
      ref={uploadFileRef}
      typeFileAccept={'.jpg,.png,.jpeg'}
      maxNumberOfFiles={10}
      maxUploadFileSize={1}
      fileListUploaded={fileListUploaded}
      onError={(item) => console.log('item', item)}
      previewImage={true}
    />
  );
};

export default UploadFileDemo;
