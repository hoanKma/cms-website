import { Flex, Text } from '@chakra-ui/react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useQueryGetCountExamByDate, useQueryGetCountQuestionByDate } from '../query';

const HeatmapChart = () => {
  const { data: examsGetByDate } = useQueryGetCountExamByDate();
  const { data: questionsGetByDate } = useQueryGetCountQuestionByDate();

  return (
    <Flex direction={'column'}>
      <Text textAlign={'center'} fontSize={24} fontWeight={800} paddingY={4}>
        Biểu đồ câu hỏi tạo mới theo ngày
      </Text>
      <Text textAlign={'center'}>{'(Dữ liệu 30 ngày gần nhất)'}</Text>
      <LineChart
        width={1000}
        height={300}
        data={questionsGetByDate}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      <Text textAlign={'center'} fontSize={24} fontWeight={800} paddingY={4}>
        {' '}
        Biểu đồ đề thi tạo mới theo ngày
      </Text>
      <Text textAlign={'center'}>{'(Dữ liệu 30 ngày gần nhất)'}</Text>

      <LineChart
        width={1000}
        height={300}
        data={examsGetByDate}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

      {/* <DataTable data={examsGetByDate} /> */}
    </Flex>
  );
};

export default HeatmapChart;
