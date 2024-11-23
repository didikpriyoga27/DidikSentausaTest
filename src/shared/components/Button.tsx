import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {twMerge} from 'tailwind-merge';
import Text from './Text';

interface IButtonProps extends TouchableOpacityProps {
  text: string;
}

const Button = ({text, ...props}: IButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={twMerge('bg-accent w-full p-4 rounded-md', props.className)}>
      <Text className="text-primary font-semibold text-center text-xl">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
