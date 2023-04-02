import { Flex } from '@chakra-ui/react';
import { Button, ButtonCreate, ButtonDelete, ButtonEdit, ButtonSearch, ButtonSubmit } from 'component/button';
import { memo } from 'react';

export default memo(() => {
  return (
    <Flex gap={4}>
      <Button>Default</Button>
      <ButtonCreate />
      <ButtonCreate isDisabled />
      <ButtonCreate isLoading />
      <ButtonEdit />
      <ButtonEdit showText={false} />
      <ButtonDelete />
      <ButtonSearch />
      <ButtonSubmit />
    </Flex>
  );
});
