import DropDownlist from 'base-component/drop-downlist';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { paramsToObject } from 'util/helper';

const Filter = () => {
  const firstTime = useRef(false);

  const dropDownListRef = useRef();

  const subjectData = useRecoilValue(subjectAtom);

  const searchParams = useSearchParams();
  const setSearchParams = searchParams[1];

  useEffect(() => {
    if (!firstTime.current) {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, subjectId: subjectData[0]?.id });
      });
      firstTime.current = true;
    }
  }, [firstTime, setSearchParams, subjectData]);

  const onChange = useCallback(
    ({ e }) => {
      setSearchParams({ subjectId: e?.id });
    },
    [setSearchParams]
  );

  return (
    <DropDownlist
      ref={dropDownListRef}
      isMulti={false}
      onChange={onChange}
      isClearable={false}
      isSearchable={false}
      isRequired
      options={subjectData}
      defaultValue={subjectData[0]}
    />
  );
};

export default memo(Filter);
