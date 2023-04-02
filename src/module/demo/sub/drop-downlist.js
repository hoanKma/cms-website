import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import DropDownlistQuery from 'base-component/drop-downlist-query';
import { LoadMoreButton, LoadMorePaging, LoadMoreSpin } from 'base-component/load-more';
import { memo, useCallback, useMemo, useRef } from 'react';
import API from 'util/api';

export default memo(() => {
  const options = useMemo(
    () => [
      {
        value: 0,
        label: 0
      },
      {
        value: 1,
        label: 1
      },
      {
        value: 2,
        label: 2
      }
    ],
    []
  );

  const dropDownListRef = useRef();
  const dropDownListQueryRef = useRef();

  const loadOptions = useCallback(async () => {
    const response = API.request({
      url: '/solr/report/select',
      params: {
        start: 1,
        rows: 10
      }
    });

    const responseJSON = await response;

    return {
      options: responseJSON
      // hasMore: responseJSON.length >= 1
    };
  }, []);

  return (
    <Flex direction={'column'} gap={10}>
      <DropDownlist
        ref={dropDownListRef}
        name={'DropDownlist'}
        placeholder={'Chọn số tiền'}
        isMulti={true}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isRequired={true}
        options={options}
        defaultValue={[options[0]]}
        onError={(error) => console.log('error', error)}
        onChange={(data) => console.log('data', data)}
      />

      <DropDownlistQuery
        ref={dropDownListQueryRef}
        name={'DropDownlistQuery'}
        pageSize={10}
        placeholder={'Chọn số tiền'}
        isMulti={true}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isRequired={true}
        onError={(error) => console.log('error', error)}
        loadOptions={loadOptions}
        labelKey="title"
        valueKey="id"
        onChange={(data) => console.log('data', data)}
      />
      <Flex
        gap={40}
        // mt="2000px"
      >
        <LoadMoreButton />
        <LoadMorePaging />
        <LoadMorePaging maxPage={3} />
        <LoadMoreSpin isLoading={true} onLoadMore={() => console.log('trigger load more')} />
      </Flex>
    </Flex>
  );
});
