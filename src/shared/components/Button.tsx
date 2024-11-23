import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {twMerge} from 'tailwind-merge';
import colors from '../utils/colors';
import Text from './Text';

interface IButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
}

const Button = ({text, isLoading, ...props}: IButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={twMerge(
        'bg-accent w-full p-4 rounded-md flex-row items-center justify-center gap-2',
        props.className,
      )}>
      {isLoading && <ActivityIndicator color={colors.primary} />}
      <Text className="text-primary font-semibold text-center text-xl">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
