import { Button } from '@chakra-ui/react';
import { forwardRef, memo } from 'react';

const CustomInput = forwardRef(({ value, onClick, placeholder, error }, ref) => {
  return (
    <Button onClick={onClick} ref={ref} size="sm" variant="outline" borderColor={error && 'red'} minH={10}>
      {value || placeholder}
    </Button>
  );
});

export default memo(CustomInput);
