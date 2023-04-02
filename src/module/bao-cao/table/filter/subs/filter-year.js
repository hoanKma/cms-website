import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetParamsURL, useSetParamURL } from 'util/hook';

const FilterYear = () => {
  const params = useParams();
  const { page } = params;
  const setParamURL = useSetParamURL();
  const getParamsURL = useGetParamsURL();
  const paramUrl = getParamsURL();
  const { year } = paramUrl;
  const options = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => i + 2017)
        .reverse()
        .map((item) => ({ value: `${item}`, label: `${item}` })),
    []
  );

  const onChange = useCallback((data) => setParamURL('year', data.e.value), [setParamURL]);

  useEffect(() => {
    if (!year && page === 'thong-tin-tai-chinh') {
      const defaultYear = options.find((item) => item.value === year) || options[3];
      setParamURL('year', defaultYear.value);
    }
  }, [year, options, page, setParamURL]);

  const currentYear = options.find((item) => item.value === year);

  if (page !== 'thong-tin-tai-chinh' || !currentYear) {
    return null;
  }

  return (
    <Flex flex={1 / 4} direction="column" gap={1}>
      <Text fontWeight={500} fontSize={13}>
        Năm
      </Text>
      <DropDownlist
        name="FilterYear"
        placeholder="Chọn..."
        isMulti={false}
        onChange={onChange}
        isClearable={false}
        isSearchable={false}
        isRequired
        options={options}
        defaultValue={options.find((item) => item.value === year)}
      />
    </Flex>
  );
};

export default memo(FilterYear);
