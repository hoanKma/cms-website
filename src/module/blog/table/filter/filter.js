import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import { useQueryTopicBySubject } from 'module/blog/create/query';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { QUESTION_LEVEL } from 'util/const';
import { paramsToObject } from 'util/helper';

const Filter = () => {
  const firstTime = useRef(false);
  const [currentSubjectCreate, setCurrentSubjectCreate] = useState();
  const dropDownListRef = useRef();

  const subjectData = useRecoilValue(subjectAtom);

  const searchParams = useSearchParams();
  const setSearchParams = searchParams[1];

  const { data: topicData } = useQueryTopicBySubject(currentSubjectCreate);

  useEffect(() => {
    if (!firstTime.current) {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, subjectId: subjectData[0]?.id });
      });
      firstTime.current = true;
    }
  }, [firstTime, setSearchParams, subjectData]);

  const onChangeSubject = useCallback(
    ({ e }) => {
      setCurrentSubjectCreate(e?.id);
      setSearchParams({ subjectId: e?.id });
    },
    [setSearchParams]
  );

  const onChangeTopic = useCallback(
    ({ e }) => {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, topicId: e?.id });
      });
    },
    [setSearchParams]
  );

  const onChangeLevel = useCallback(
    ({ e }) => {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, level: e?.value });
      });
    },
    [setSearchParams]
  );

  return (
    <Flex w={'fit-content'} gap={4}>
      <DropDownlist
        ref={dropDownListRef}
        isMulti={false}
        onChange={onChangeSubject}
        isClearable={false}
        isSearchable={false}
        isRequired
        options={subjectData}
      />
      <DropDownlist
        name={'topic'}
        isMulti={false}
        placeholder="Chọn Chuyên đề"
        onChange={onChangeTopic}
        isClearable={false}
        isSearchable={false}
        isRequired
        options={topicData}
        labelKey="title"
        valueKey="id"
      />

      <DropDownlist
        name="level"
        placeholder="Chọn Cấp độ"
        isClearable={false}
        isSearchable={false}
        isRequired={true}
        onChange={onChangeLevel}
        options={QUESTION_LEVEL}
      />
    </Flex>
  );
};

export default memo(Filter);
