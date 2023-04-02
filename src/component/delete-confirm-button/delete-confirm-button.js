import { Text } from '@chakra-ui/react';
import Popup from 'base-component/popup';
import { ButtonDelete } from 'component/button';
import PropTypes from 'prop-types';
import { memo, useCallback, useRef } from 'react';

const DeleteConfirmButton = (props) => {
  const { onConfirm, children, popupSize, isLoading } = props;
  const popupRef = useRef();
  const onOpenPopup = useCallback(() => popupRef.current.show(), []);

  return (
    <>
      <ButtonDelete onClick={onOpenPopup} isLoading={isLoading} />
      <Popup title="Xác nhận xoá" ref={popupRef} onConfirm={onConfirm} size={popupSize}>
        {children || <Text>Bạn có chắc chắn muốn xoá?</Text>}
      </Popup>
    </>
  );
};

DeleteConfirmButton.propTypes = {
  onConfirm: PropTypes.func.isRequired
};

export default memo(DeleteConfirmButton);
