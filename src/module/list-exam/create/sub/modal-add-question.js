import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import TableControl from 'component/table-control';
import { memo, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUESTION_LEVEL } from 'util/const';
import { paramsToObject } from 'util/helper';
import { useQueryTopicBySubject } from '../query';
import SubAddQuestionTable from './sub-add-question/table';

const ModalAddQuestion = ({ currentSubjectCreate }) => {
  const { data: topicData } = useQueryTopicBySubject(currentSubjectCreate);

  const setSearchParams = useSearchParams()[1];

  const [level, setLevel] = useState(0);
  const [topicId, setTopicId] = useState();

  const onChangeSearch = useCallback(
    (keyword) => {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, keyword });
      });
    },
    [setSearchParams]
  );

  return (
    <Flex flexDirection="column" my={5}>
      {/* <TableControl onSearch={onChangeSearch} createRoute="tao-moi" defaultSearchValue={title}></TableControl> */}
      <Text fontWeight={700} mb={2}>
        Chọn chuyên đề
      </Text>
      <DropDownlist
        name={'topic'}
        isMulti={false}
        placeholder="Chọn Chuyên đề"
        onChange={(item) => setTopicId(item?.e?.id)}
        isClearable={false}
        isSearchable={false}
        isRequired
        options={topicData}
        labelKey="title"
        valueKey="id"
      />
      <Text fontWeight={700} my={2}>
        Chọn cấp độ
      </Text>
      <DropDownlist
        name="level"
        placeholder="Chọn Cấp độ"
        isClearable={false}
        isSearchable={false}
        isRequired={true}
        onChange={(item) => setLevel(item.e.value)}
        options={QUESTION_LEVEL}
      />
      <Flex flexDirection={'column'}>
        <Text fontWeight={700} my={2}>
          Nhập từ khoá
        </Text>
        <TableControl onSearch={onChangeSearch} action={false}></TableControl>
      </Flex>

      <Flex w="full" mt={2}>
        <SubAddQuestionTable level={level} topicId={topicId} />
      </Flex>
    </Flex>
  );
};

export default memo(ModalAddQuestion);
