import DropDownlist from 'base-component/drop-downlist';
import { memo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECT_DATA } from 'util/const';

const Filter = () => {
  const dropDownListRef = useRef();
  const navigate = useNavigate();

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
      options={SUBJECT_DATA}
      defaultValue={SUBJECT_DATA[8]}
    />
  );
};

export default memo(Filter);
