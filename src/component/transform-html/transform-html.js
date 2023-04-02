import { Flex, Text } from '@chakra-ui/react';
// import { processNodes } from 'react-html-parser';
import { processNodes } from 'html-react-parser';
import { AdvancedImgTag } from './transform-html.tag';

export const transformHtml = (htmlConfig, imageConfig, previewData) => {
  const { node, index } = htmlConfig;
  const { imageUrls, onShowImage } = imageConfig;

  const transformElement = (node, index) => {
    const { children, name, type, attribs } = node;

    if (type === 'tag' && name === 'img') {
      return (
        <AdvancedImgTag
          key={`html_img_${index}`}
          src={attribs.src}
          imageUrls={imageUrls}
          onShowImage={previewData ? undefined : (index) => onShowImage(index)}
        />
      );
    }

    if (type === 'tag' && name === 'p') {
      if (Array.isArray(children) && children[0]?.name === 'br') {
        return (
          <Text key={`html_br_${index}`} h="14px">
            {'\n'}
          </Text>
        );
      }
      return <Text key={`html_p_${index}`}>{processNodes(children, transformElement)}</Text>;
    }

    if (type === 'tag' && name === 'h2') {
      return (
        <Text key={`html_h1_${index}`} fontSize={16} fontWeight={700}>
          {processNodes(children, transformElement)}
        </Text>
      );
    }

    if (type === 'tag' && name === 'h3') {
      return (
        <Text key={`html_h3_${index}`} fontSize={15} fontWeight={600}>
          {processNodes(children, transformElement)}
        </Text>
      );
    }

    if (type === 'tag' && name === 'h4') {
      return (
        <Text key={`html_h4_${index}`} fontSize={14} fontWeight={500}>
          {processNodes(children, transformElement)}
        </Text>
      );
    }

    if (type === 'tag' && name === 'ul') {
      return (
        <Flex direction="column" px={4} key={`html_ul_${index}`}>
          <ul style={{ padding: '0 16px' }}>{processNodes(children, transformElement)}</ul>
        </Flex>
      );
    }

    if (type === 'tag' && name === 'ol') {
      return (
        <Flex direction="column" px={4} key={`html_ol_${index}`}>
          <ol style={{ padding: '0 16px' }}>{processNodes(children, transformElement)}</ol>
        </Flex>
      );
    }

    return undefined;
  };

  return transformElement(node, index);
};
