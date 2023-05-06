import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Text
} from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
// import renderHtml from 'react-html-parser';
import { ButtonEdit } from 'component/button';
import { AdvancedImgTag } from 'component/transform-html/transform-html.tag';
import parse, { domToReact } from 'html-react-parser';
import { useQueryDetailQuestion } from 'module/blog/table/table.query';
import { parse as parseHtml } from 'node-html-parser';
import { FaTimes } from 'react-icons/fa';
import { Link as LinkRoute } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { questionIdInCreateExamAtom } from '../recoil';

const ExamUi = ({ questionId, index }) => {
  const { data: infoDetail } = useQueryDetailQuestion(questionId);
  const [questionIdInCreate, setQuestionIdInCreate] = useRecoilState(questionIdInCreateExamAtom);

  const { title = '', answers, explanation } = infoDetail || {};

  const rawHtml = parseHtml(title);
  const imgElements = rawHtml.querySelectorAll('img') || [];
  const imageUrls = imgElements.map((item) => item.attrs.src);

  const options = {
    replace: (domNode) => {
      const { children, type, name, attribs } = domNode;

      if (type === 'tag' && name === 'img') {
        return <AdvancedImgTag src={attribs.src} imageUrls={imageUrls} />;
      }

      if (type === 'tag' && name === 'a') {
        return (
          <Link href={attribs.href} color="#076db6" textDecoration={'underline'}>
            {domToReact(children, options)}
          </Link>
        );
      }

      if (type === 'tag' && name === 'p') {
        if (Array.isArray(children) && children[0]?.name === 'br') {
          return <Text h="14px">{'\n'}</Text>;
        }
        return <Text>{domToReact(children, options)}</Text>;
      }

      if (type === 'tag' && name === 'h2') {
        return (
          <Text fontSize={16} fontWeight={700}>
            {domToReact(children, options)}
          </Text>
        );
      }

      if (type === 'tag' && name === 'h3') {
        return (
          <Text fontSize={15} fontWeight={600}>
            {domToReact(children, options)}
          </Text>
        );
      }

      if (type === 'tag' && name === 'h4') {
        return (
          <Text fontSize={14} fontWeight={500}>
            {domToReact(children, options)}
          </Text>
        );
      }

      if (type === 'tag' && name === 'ul') {
        return (
          <Flex direction="column" px={4}>
            <ul style={{ padding: '0 16px' }}>{domToReact(children, options)}</ul>
          </Flex>
        );
      }

      if (type === 'tag' && name === 'ol') {
        return (
          <Flex direction="column" px={4}>
            <ol style={{ padding: '0 16px' }}>{domToReact(children, options)}</ol>
          </Flex>
        );
      }
    }
  };

  const handleRemoveQuestionId = useCallback(() => {
    setQuestionIdInCreate((prevState) => prevState.filter((id) => id !== questionId));
  }, [questionId, setQuestionIdInCreate]);

  const getIndex = useMemo(
    () => questionIdInCreate.findIndex((element) => element === questionId),
    [questionId, questionIdInCreate]
  );

  return (
    <Flex direction={'column'} padding={'10px'} border={'1px dashed green'} borderRadius={'10px'} width={'full'}>
      <Flex justifyContent={'space-between'}>
        <Heading as="h4" fontSize={'16px'}>
          Câu {getIndex + 1}
        </Heading>
        <Flex gap={4}>
          <LinkRoute to={`../../cau-hoi/chi-tiet/${questionId}`} target="_blank">
            <ButtonEdit />
          </LinkRoute>
          <Button colorScheme="red" size="sm" onClick={handleRemoveQuestionId}>
            <Icon as={FaTimes} color={'#fff'} />
          </Button>
        </Flex>
      </Flex>
      {parse(title, options)}

      {answers?.map((item, index) => {
        return (
          <Flex key={index} gap={4} color={item.isCorrect && '#F6941F'}>
            <Text fontWeight={item.isCorrect && 800}>{item.value}.</Text>
            <Text fontWeight={item.isCorrect && 800}>{parse(item.label, options)}</Text>
          </Flex>
        );
      })}
      <Accordion allowMultiple marginTop={4}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1">Xem giải thích</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>{parse(explanation || 'Chưa có giải thích', options)}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default memo(ExamUi);
