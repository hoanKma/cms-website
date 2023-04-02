import { Table } from '@chakra-ui/react';
import equal from 'fast-deep-equal';
import { forwardRef, memo, useEffect, useImperativeHandle } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import Config from './config';
import { cmsTableConfig, cmsTableData, cmsTableHeader } from './recoil';
import Body from './sub/body';
import Header from './sub/header';

const TableComponent = forwardRef((props, ref) => {
  const { header: newHeader, rowKey, config: moreConfig, action, customRow, name } = props;
  const [header, setHeader] = useRecoilState(cmsTableHeader(name));
  const [data, setData] = useRecoilState(cmsTableData(name));
  const resetData = useResetRecoilState(cmsTableData(name));
  const [config, setConfig] = useRecoilState(cmsTableConfig(name));

  useEffect(() => {
    if (!equal(config, { ...Config, ...moreConfig })) {
      setConfig({ ...Config, ...moreConfig });
    }
  }, [config, moreConfig, setConfig]);

  useImperativeHandle(ref, () => ({
    setMoreData(moreData) {
      if (!Array.isArray(moreData) && moreData.length > 0) {
        return;
      }

      setData((current) => {
        if (!current) {
          return [...moreData];
        }

        return [...current, ...moreData];
      });
    },
    setNewData(newData) {
      if (Array.isArray(newData)) {
        setData([...newData]);
      }
    },
    reset() {
      resetData();
    },
    getData() {
      return data;
    }
  }));

  useEffect(() => {
    if (!equal(header, newHeader)) {
      setHeader(newHeader);
    }
  }, [header, newHeader, setHeader]);

  return (
    <Table variant="unstyled" w="full">
      <Header name={name} action={action} />
      <Body rowKey={rowKey} action={action} customRow={customRow} name={name} />
    </Table>
  );
});

export default memo(TableComponent);
