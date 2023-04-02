import { Flex, Icon, Text } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { memo, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { fileListAtom, fileListRejectAtom } from '../recoil';
import Item from './item';
import ItemReject from './item-reject';

const PreviewFile = ({ previewImage, id }) => {
  const fileList = useRecoilValue(fileListAtom(id));
  const fileListReject = useRecoilValue(fileListRejectAtom(id));
  const resetFileListReject = useResetRecoilState(fileListRejectAtom(id));

  const onClick = useCallback(() => {
    resetFileListReject();
  }, [resetFileListReject]);

  return (
    <Flex bgColor="#FFF" zIndex={100} direction="column" gap={5}>
      {!isEmpty(fileList) && (
        <Flex w="full" direction="column">
          <Text fontWeight={'500'}>Danh sách file hợp lệ</Text>
          {fileList.map((item, index) => {
            return <Item item={item} key={`preview_file_${index}`} previewImage={previewImage} id={id} />;
          })}
        </Flex>
      )}
      {!isEmpty(fileListReject) && (
        <Flex w="full" direction="column">
          <Flex alignItems={'center'} justifyContent="space-between" cursor={'pointer'}>
            <Text fontWeight={'500'}>Danh sách file không hợp lệ</Text>
            <Icon as={FaTimes} fontSize={18} color="red" onClick={onClick} />
          </Flex>

          {fileListReject.map((item, index) => {
            return <ItemReject item={item} key={`preview_file_reject_${index}`} />;
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default memo(PreviewFile);
