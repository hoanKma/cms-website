import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { Button, Center, Flex, Image, Input, Text } from '@chakra-ui/react';

/**
 * Display existing avatar, and select a new one.
 */
const FormAvatar = forwardRef((_, ref) => {
  const [avatar, setAvatar] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const fileInputRef = useRef();
  useImperativeHandle(ref, () => ({
    getFile: () => {
      if (avatar) {
        return avatar;
      } else {
        setErrorMessage('Vui lòng chọn ảnh đại diện!');
      }
    },
    setError: (error) => {
      setErrorMessage(error);
    }
  }));

  const onFileChange = useCallback((e) => {
    if (e?.target?.files?.length > 0) {
      setAvatar(e.target.files[0]);
      setErrorMessage('');
    }
  }, []);

  return (
    <Flex direction="column">
      <Button type="button" onClick={() => fileInputRef.current.click()} h="fit-content" p={0} overflow="hidden">
        {avatar ? (
          <Image maxH="150px" alt="avatar" fit="cover" src={URL.createObjectURL(avatar)} />
        ) : (
          <Center h="150px" w="150px">
            <Text>Chọn ảnh đại diện</Text>
          </Center>
        )}
      </Button>

      <Input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        multiple={false}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={onFileChange}
      />

      {errorMessage && (
        <Text color="red.1" mt={1}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
});

export default FormAvatar;
