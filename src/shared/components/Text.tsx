import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {twMerge} from 'tailwind-merge';

const Text = (props: TextProps) => {
  return (
    <RNText
      {...props}
      className={twMerge('text-white text-base font-regular', props.className)}
    />
  );
};

export default Text;
