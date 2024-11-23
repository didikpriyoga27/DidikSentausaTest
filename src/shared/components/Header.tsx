import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ArrowLeftIcon from '../assets/icons/ArrowLeftIcon';
import Text from './Text';

interface IHeaderProps {
  isWithBack?: boolean;
  title?: string;
}

const Header = ({isWithBack = false, title = ''}: IHeaderProps) => {
  const {goBack} = useNavigation();
  return (
    <View className="p-4">
      <View
        className={`flex-row items-center  ${!isWithBack && 'justify-center'}`}>
        {isWithBack && (
          <TouchableOpacity onPress={goBack} className="-ml-4 p-4">
            <ArrowLeftIcon />
          </TouchableOpacity>
        )}

        <Text className={'text-2xl font-semibold'}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
