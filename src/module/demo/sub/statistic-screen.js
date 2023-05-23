import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaChalkboardTeacher, FaFileAlt, FaLeanpub, FaUserGraduate } from 'react-icons/fa';
import { useQueryGetCountExam, useQueryGetCountQuestion, useQueryGetCountUser } from '../query';
import HeatmapChart from './heatmap-chart';
const StatisticScreen = () => {
  const { data: countTeacher } = useQueryGetCountUser('TEACHER');
  const { data: countUser } = useQueryGetCountUser('STUDENT');
  const { data: countQuestion } = useQueryGetCountQuestion();
  const { data: countExam } = useQueryGetCountExam();

  return (
    <Flex gap={8} flexWrap={'wrap'}>
      <Flex border={'1px solid green'} borderRadius={10} direction={'column'}>
        <Flex h={2} bg={'green'} borderTopLeftRadius={10} borderTopRightRadius={10}></Flex>
        <Flex direction={'column'} padding={4} gap={2}>
          <Icon as={FaUserGraduate} color="green" boxSize={16} />
          <Text fontSize={'28px'} fontWeight={700} color={'green'}>
            Tổng số học sinh
          </Text>
          <Text fontSize={'28px'} fontWeight={700}>
            {countUser?.count}
          </Text>
        </Flex>
      </Flex>

      <Flex border={'1px solid orange'} borderRadius={10} direction={'column'}>
        <Flex h={2} bg={'orange'} borderTopLeftRadius={10} borderTopRightRadius={10}></Flex>
        <Flex direction={'column'} padding={4} gap={2}>
          <Icon as={FaChalkboardTeacher} color="orange" boxSize={16} />
          <Text fontSize={'28px'} fontWeight={700} color={'orange'}>
            Tổng số giáo viên
          </Text>
          <Text fontSize={'28px'} fontWeight={700}>
            {countTeacher?.count}
          </Text>
        </Flex>
      </Flex>

      <Flex border={'1px solid purple'} borderRadius={10} direction={'column'}>
        <Flex h={2} bg={'purple'} borderTopLeftRadius={10} borderTopRightRadius={10}></Flex>
        <Flex direction={'column'} padding={4} gap={2}>
          <Icon as={FaLeanpub} color="purple" boxSize={16} />
          <Text fontSize={'28px'} fontWeight={700} color={'purple'}>
            Tổng số câu hỏi
          </Text>
          <Text fontSize={'28px'} fontWeight={700}>
            {countQuestion?.count}
          </Text>
        </Flex>
      </Flex>
      <Flex border={'1px solid red'} borderRadius={10} direction={'column'}>
        <Flex h={2} bg={'red'} borderTopLeftRadius={10} borderTopRightRadius={10}></Flex>
        <Flex direction={'column'} padding={4} gap={2}>
          <Icon as={FaFileAlt} color="red" boxSize={16} />
          <Text fontSize={'28px'} fontWeight={700} color={'red'}>
            Tổng số đề thi
          </Text>
          <Text fontSize={'28px'} fontWeight={700}>
            {countExam?.count}
          </Text>
        </Flex>
      </Flex>
      <HeatmapChart />
    </Flex>
  );
};

export default StatisticScreen;
