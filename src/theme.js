import { Platform } from 'react-native';

const theme = {
  colors: {
    headingPrimary: '#c8c8c8',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#e1e4e8',
    appBarBackground: 'black'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;