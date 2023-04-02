import { Tbody } from "@chakra-ui/react";
import { cmsTableData } from "component/table/recoil";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import Row from "./row";

export default memo((props) => {
  const { rowKey, action, customRow, name } = props;
  const data = useRecoilValue(cmsTableData(name));

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <Tbody>
      {data.map((item, index) => {
        return (
          <Row
            key={rowKey ? item[rowKey] : `table-row-${index}`}
            data={item}
            index={index}
            action={action}
            customRow={customRow}
            name={name}
          />
        );
      })}
    </Tbody>
  );
});
