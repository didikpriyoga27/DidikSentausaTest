import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
const BankIcon = (props: SvgProps) => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
    <G clipPath="url(#clip0_110_900)">
      <Path
        d="M6 38V11.4C5.99988 10.9894 6.1261 10.5888 6.36154 10.2524C6.59697 9.91611 6.93021 9.66038 7.316 9.51997L26.658 2.48797C26.8091 2.43299 26.9712 2.41524 27.1306 2.43624C27.29 2.45724 27.442 2.51637 27.5737 2.60861C27.7054 2.70086 27.8129 2.82349 27.8871 2.96613C27.9613 3.10876 28 3.26719 28 3.42797V13.334L40.632 17.544C41.0304 17.6767 41.3769 17.9314 41.6225 18.2721C41.868 18.6127 42.0001 19.022 42 19.442V38H46V42H2V38H6ZM10 38H24V7.70997L10 12.802V38ZM38 38V20.884L28 17.55V38H38Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_110_900">
        <Rect width={48} height={48} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BankIcon;
