import React from 'react';
import {Text, View} from 'react-native';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';

const HomeScreen = () => {
  return (
    <BaseLayoutComponent>
      <View className="p-4">
        <Text className="text-white text-2xl">HomeScreen</Text>
      </View>
    </BaseLayoutComponent>
  );
};

export default HomeScreen;
