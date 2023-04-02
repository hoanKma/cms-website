import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { RecoilRoot } from 'recoil';
import UploadFile from './upload-file';

const Main = forwardRef((props, ref) => {
  return (
    // <ChakraProvider>
    <RecoilRoot>
      <UploadFile {...props} ref={ref} />
    </RecoilRoot>
    // </ChakraProvider>
  );
});

Main.propTypes = {
  typeFileAccept: PropTypes.string, // vd: {".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"}
  maxNumberOfFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // vd: 10
  maxUploadFileSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // vd: 1 (unit MB)
  fileListUploaded: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      id: PropTypes.string
    })
  ),
  isRequired: PropTypes.bool,
  validate: PropTypes.func,
  customValidate: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func // [{ errorMaxFile: number }, { errorFileInValidType: array }, { errorMaxFileSize: array }]
};

export default memo(Main);
