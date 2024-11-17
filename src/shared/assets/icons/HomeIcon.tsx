import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
const HomeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#clip0_111_976)">
      <Path
        d="M19 21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V11H1L11.327 1.61198C11.5111 1.44446 11.7511 1.35162 12 1.35162C12.2489 1.35162 12.4889 1.44446 12.673 1.61198L23 11H20V20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21ZM6 19H18V9.15698L12 3.70298L6 9.15698V19ZM8 15H16V17H8V15Z"
        fill={props.color || '#F4DE34'}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_111_976">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default HomeIcon;
