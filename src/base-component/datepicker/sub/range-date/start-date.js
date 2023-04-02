import { Flex, Text } from '@chakra-ui/react';
import vn from 'date-fns/locale/vi';
import { memo } from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from '../custom-input';

const StartDate = memo(
  ({ name, startDate, endDate, isHours, placeHolder, dateFormat, isClearable, onChange, errorMessage }) => {
    return (
      <Flex align="center">
        <Text width={10}>Từ:</Text>
        <DatePicker
          dropdownMode="select"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          locale={vn}
          name={name}
          startDate={startDate}
          endDate={endDate}
          selected={startDate}
          showTimeSelect={isHours}
          placeholderText={placeHolder}
          dateFormat={dateFormat}
          isClearable={isClearable}
          customInput={<CustomInput error={errorMessage} />}
          onChange={onChange}
        />
      </Flex>
    );
  }
);

export default StartDate;
