import { Td, Tr } from '@chakra-ui/react';
import { cmsTableConfig, cmsTableHeader } from 'component/table/recoil';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import Column from './column';

export default memo((props) => {
  const { data, index, action, customRow, name } = props;
  const header = useRecoilValue(cmsTableHeader(name));
  const config = useRecoilValue(cmsTableConfig(name));
  const { oddRowBackgroundColor, evenRowBackgroundColor, showIndex } = config;

  if (!Array.isArray(header) || header.length === 0) {
    return null;
  }

  const backgroundColor = index % 2 === 0 ? evenRowBackgroundColor : oddRowBackgroundColor;

  return (
    <Tr>
      {showIndex && <Td backgroundColor={backgroundColor}>{index + 1}</Td>}
      {header.map((item) => {
        const { field } = item;

        return (
          <Column
            key={field}
            value={data[field]}
            header={item}
            customRow={customRow}
            backgroundColor={backgroundColor}
          />
        );
      })}
      {action && <Td backgroundColor={backgroundColor}>{action(data)}</Td>}
    </Tr>
  );
});
