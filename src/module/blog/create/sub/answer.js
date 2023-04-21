import { Box, Flex, Radio, RadioGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useState } from 'react';

function RadioInputCharaka(props) {
  const [value, setValue] = useState(props.defaultValue || '');

  const handleOptionChange = (event) => {
    setValue(event.target.value);
  };

  const handleCharakaChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <RadioGroup onChange={handleOptionChange} value={value}>
        <Flex alignItems="center">
          <Radio value={props.value} size="md">
            {props.label}
          </Radio>
          <Slider
            aria-label={props.label}
            value={value}
            min={props.min}
            max={props.max}
            onChange={handleCharakaChange}
            ml={4}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Box ml={4}>{value}</Box>
        </Flex>
      </RadioGroup>
    </Box>
  );
}

export default RadioInputCharaka;
