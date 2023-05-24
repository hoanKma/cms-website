import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

function DataTable({ data }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Ngày</Th>
          <Th>Số lượng</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index}>
            <Td>{item.date}</Td>
            <Td>{item.count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default DataTable;
