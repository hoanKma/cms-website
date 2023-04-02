import { memo } from "react";
import Row from "./row";

const Content = memo((props) => {
  const { data } = props;

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data.map((item, index) => (
    <Row key={item.title + index} data={item} index={index} />
  ));
});

export default Content;
