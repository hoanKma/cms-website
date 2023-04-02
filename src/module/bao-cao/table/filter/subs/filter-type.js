import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import { REPORT_TYPES } from 'module/bao-cao/subs/data';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetParamsURL, useSetParamURL } from 'util/hook';

const FilterType = () => {
  const params = useParams();
  const { page } = params;
  const setParamURL = useSetParamURL();
  const getParamsURL = useGetParamsURL();
  const paramUrl = getParamsURL();
  const { type } = paramUrl;
  const options = useMemo(
    () => REPORT_TYPES.filter((item) => item.route === page).map((item) => ({ value: item.value, label: item.label })),
    [page]
  );

  const onChange = useCallback((data) => setParamURL('type', data.e.value), [setParamURL]);

  useEffect(() => {
    if (!type && ['thong-tin-tai-chinh', 'quan-tri-doanh-nghiep'].includes(page)) {
      setParamURL('type', options[0].value);
    }
  }, [options, page, setParamURL, type]);

  const currentType = options.find((item) => item.value === type);

  if (!['thong-tin-tai-chinh', 'quan-tri-doanh-nghiep'].includes(page) || !currentType) {
    return null;
  }

  return (
    <Flex flex={1 / 4} direction="column" gap={1}>
      <Text fontWeight={500} fontSize={13}>
        Phân loại
      </Text>
      <DropDownlist
        name="FilterType"
        placeholder="Chọn..."
        isMulti={false}
        onChange={onChange}
        isClearable={false}
        isSearchable={false}
        isRequired
        options={options}
        defaultValue={currentType}
      />
    </Flex>
  );
};

export default memo(FilterType);
