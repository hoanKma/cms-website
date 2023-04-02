import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import FieldLabel from 'component/field-label';
import dayjs from 'dayjs';
import { memo } from 'react';
// import renderHtml from 'react-html-parser';
import { AdvancedImgTag } from 'component/transform-html/transform-html.tag';
import parse, { domToReact } from 'html-react-parser';
import { parse as parseHtml } from 'node-html-parser';

const BlogUi = ({ infoDetail }) => {
  const { title, created_date, content } = infoDetail;

  const rawHtml = parseHtml(content);
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

  return (
    <Flex direction={'column'}>
      <FieldLabel title="Giao diện Câu hỏi" />

      <Flex direction="column" border={'1px dashed #F7941D'} borderRadius="5px" padding={'10px'} gap={4}>
        <Heading as="h3" fontSize={'32px'}>
          {title}
        </Heading>

        <Text color={'#828282'}>{dayjs(created_date).format('DD/MM/YYYY - HH:mm')}</Text>

        {parse(content, options)}
      </Flex>
    </Flex>
  );
};

export default memo(BlogUi);
