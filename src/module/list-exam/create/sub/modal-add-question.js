import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import { memo, useState } from 'react';
import { QUESTION_LEVEL } from 'util/const';
import { useQueryTopicBySubject } from '../query';
import SubAddQuestionTable from './sub-add-question/table';

const ModalAddQuestion = ({ currentSubjectCreate }) => {
  const { data: topicData } = useQueryTopicBySubject(currentSubjectCreate);

  const [level, setLevel] = useState(0);
  const [topicId, setTopicId] = useState();

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
      <Flex w="full" mt={2}>
        <SubAddQuestionTable level={level} topicId={topicId} />
      </Flex>
    </Flex>
  );
};

export default memo(ModalAddQuestion);
