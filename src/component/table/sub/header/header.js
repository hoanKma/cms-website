import { Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { cmsTableConfig, cmsTableHeader } from 'component/table/recoil';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';

export default memo((props) => {
  const { name, action } = props;
  const header = useRecoilValue(cmsTableHeader(name));
  const config = useRecoilValue(cmsTableConfig(name));

  if (!Array.isArray(header) || header.length === 0) {
    return null;
  }

  const { headerBackgroundColor, headerTextColor, headerTextSize, showIndex } = config || {};

  return (
    <Thead style={{ backgroundColor: headerBackgroundColor }}>
      <Tr>
        {showIndex && (
          <Th fontSize={headerTextSize} textColor={headerTextColor}>
            STT
          </Th>
        )}
        {header.map((item) => {
          const { toolTip, title, field, headerTextAlign } = item;

          return (
            <Tooltip key={field} hasArrow label={toolTip}>
              <Th textAlign={headerTextAlign} fontSize={headerTextSize} textColor={headerTextColor}>
                {title}
              </Th>
            </Tooltip>
          );
        })}
        {action && (
          <Th fontSize={headerTextSize} textColor={headerTextColor}>
            Hành động
          </Th>
        )}
      </Tr>
    </Thead>
  );
});
