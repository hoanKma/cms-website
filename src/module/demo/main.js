import { Flex } from '@chakra-ui/react';
import Button from './sub/button';
import DemoCheckbox from './sub/checkbox';
import DatePickerDemo from './sub/datepicker';
import DropDownlist from './sub/drop-downlist';
import Input from './sub/input';
import Loading from './sub/loading';
import Popup from './sub/popup';
import FormRadioGroup from './sub/radio-box';
import UploadFileDemo from './sub/upload-file';

const Main = () => {
  return (
    <Flex direction={'column'} gap={4}>
      <Button />
      <DemoCheckbox />
      <DatePickerDemo />
      <DropDownlist />
      <Input />
      <Loading />
      <Popup />
      <FormRadioGroup />
      <UploadFileDemo />
    </Flex>
  );
};

export default Main;
