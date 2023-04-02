import { Flex, Text } from '@chakra-ui/react';
import vn from 'date-fns/locale/vi';
import { memo } from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from '../custom-input';

const EndDate = memo(
  ({ name, startDate, endDate, isHours, placeHolder, dateFormat, isClearable, onChange, errorMessage }) => {
    return (
      <Flex align="center">
        <Text width={10}>Đến:</Text>
        <DatePicker
          locale={vn}
          dropdownMode="select"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          name={name}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selected={endDate}
          placeholderText={placeHolder}
          dateFormat={dateFormat}
          showTimeSelect={isHours}
          isClearable={isClearable}
          customInput={<CustomInput error={errorMessage} />}
          onChange={onChange}
        />
      </Flex>
    );
  }
);

export default EndDate;
