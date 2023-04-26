import { Flex, Heading, Link, Text, useBreakpointValue } from '@chakra-ui/react';
import { memo, useEffect } from 'react';
// import renderHtml from 'react-html-parser';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import { AdvancedImgTag } from 'component/transform-html/transform-html.tag';
import parse, { domToReact } from 'html-react-parser';
import { useQueryDetailQuestion } from 'module/blog/table/table.query';
import { parse as parseHtml } from 'node-html-parser';
import queryString from 'query-string';
import { LS_KEY_SB_JWT } from 'util/const';

export default memo(() => {
  const size = useBreakpointValue({ base: 'md', lg: 'lg' });
  const currentUrl = window.location.href;
  const params = queryString.parseUrl(currentUrl).query;
  const accessToken = params.token;
  const questionId = params.questionId;

  const { isLoading: loadingDetail, data: infoDetail, error: errorDetail } = useQueryDetailQuestion(questionId);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(LS_KEY_SB_JWT, accessToken);
    }
  }, [accessToken]);

  const { title = '', answers, explanation = 'Chưa có phần giải thích' } = infoDetail || {};

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

  if (loadingDetail) {
    return <LoadingScreen />;
  }

  if (errorDetail || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message} />;
  }

  return (
    <Flex direction="column" border={'1px dashed #F7941D'} borderRadius="5px" padding={'10px'} gap={4}>
      {parse(title, options)}
      <Flex direction={'column'} gap={2}>
        {answers?.map((item, index) => {
          return (
            <Flex key={index} gap={2} color={item.isCorrect && '#F6941F'}>
              <Text fontWeight={item.isCorrect && 800}>{item.value}.</Text>
              <Text fontWeight={item.isCorrect && 800}>{parse(item.label, options)}</Text>
            </Flex>
          );
        })}
      </Flex>
      {explanation && (
        <>
          <Heading as="h3" fontSize={'22px'}>
            Giải thích
          </Heading>
          {parse(explanation, options)}
        </>
      )}
    </Flex>
  );
});
