import { Td } from "@chakra-ui/react";
import { memo } from "react";

export default memo((props) => {
  const { value, header, customRow, backgroundColor } = props;
  const { rowText = {}, field } = header;

  const row = typeof customRow === "function" && customRow(field, value);

  if (row) {
    return <Td backgroundColor={backgroundColor}>{row}</Td>;
  }

  const { align, size, color } = rowText;
  return (
    <Td
      backgroundColor={backgroundColor}
      textAlign={align}
      fontSize={size}
      textColor={color}
    >
      {value}
    </Td>
  );
});
