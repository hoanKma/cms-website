import { Flex, Input, Text } from '@chakra-ui/react';
import vn from 'date-fns/locale/vi';
import dayjs from 'dayjs';
import { memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useController, useFormContext } from 'react-hook-form';
import './sub/index.css';

export default memo((props) => {
  const { formConfig } = props;
  const { rules, key, title } = formConfig;
  const { control } = useFormContext();
  const { field } = useController({ name: key });
  const [selected, setSelected] = useState(field.value);

  return (
    <Flex direction="column" gap={2}>
      <Text>{title}</Text>
      <Controller
        control={control}
        rules={rules}
        name={key}
        render={({ field }) => (
          <DatePicker
            locale={vn}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            dropdownMode="select"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            customInput={<Input />}
            onChange={(e) => {
              field.onChange(e);
              setSelected(e ? dayjs(e).format('DD/MM/YYYY') : undefined);
            }}
            selected={selected ? dayjs(selected, 'DD/MM/YYYY').toDate() : undefined}
          />
        )}
      />
    </Flex>
  );
});
