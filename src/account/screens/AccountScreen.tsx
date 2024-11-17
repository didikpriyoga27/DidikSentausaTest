import React from 'react';
import {Text, View} from 'react-native';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';

const AccountScreen = () => {
  return (
    <BaseLayoutComponent>
      <View className="p-4">
        <Text className="text-white text-2xl">AccountScreen</Text>
      </View>
    </BaseLayoutComponent>
  );
};

export default AccountScreen;
