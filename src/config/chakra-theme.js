import { extendTheme } from '@chakra-ui/react';

const BreakpointConfig = {
  breakpoints: {
    xs: '320px', // mobile
    sm: '480px',
    md: '768px', // tablet
    lg: '992px',
    xl: '1280px', // desktop
    '2xl': '1600px'
  }
};

const ColorConfig = {
  colors: {
    primary: { 1: '#f7941e', 2: '#f68b09', 0: '#f79722' },
    text: { 1: '#4f4f4f', 2: '#828282' },
    link: { 1: '#3182CE', 2: '#2B6CB0' }
  }
};

const FontConfig = {
  fonts: {}
};

export const chakraTheme = extendTheme({
  // ...ComponentsTheme,
  ...FontConfig,
  ...ColorConfig,
  ...BreakpointConfig
  // ...MiscConfig,
  // ...GlobalConfig
});
