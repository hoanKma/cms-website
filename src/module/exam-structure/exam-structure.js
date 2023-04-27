import { Flex } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
// import renderHtml from 'react-html-parser';
import queryString from 'query-string';

export default memo(() => {
  const currentUrl = window.location.href;
  const params = queryString.parseUrl(currentUrl).query;
  const subjectId = params.subjectId;

  const valueSubject = useMemo(() => {
    switch (subjectId) {
      case '641ac650297dda14f655e53d':
        return { title: 'Toán học' };

      default:
        return { title: 'Toán học' };
    }
  }, [subjectId]);

  return (
    <Flex direction="column" border={'1px dashed #F7941D'} borderRadius="5px" padding={'10px'} gap={4}>
      Cấu trúc đề thi môn {valueSubject.title}
    </Flex>
  );
});
