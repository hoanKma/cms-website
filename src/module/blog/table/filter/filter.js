import DropDownlist from 'base-component/drop-downlist';
import { memo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';

const Filter = () => {
  const dropDownListRef = useRef();
  const navigate = useNavigate();

  const subjectData = useRecoilValue(subjectAtom);

  const onChange = useCallback(
    ({ e }) => {
      navigate(`${e.key}`);
    },
    [navigate]
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
