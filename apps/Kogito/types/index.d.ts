declare module '*.png' {
  import type {ImageRequireSource} from 'react-native';

  const image: ImageRequireSource;
  export default image;
}

declare module '*.jpg' {
  import type {ImageRequireSource} from 'react-native';

  const image: ImageRequireSource;
  export default image;
}

declare module '*.svg' {
  import type React from 'react';
  import type {SvgProps} from 'react-native-svg';

  const svg: React.FC<SvgProps>;
  export default svg;
}
