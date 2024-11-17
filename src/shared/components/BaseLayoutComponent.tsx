import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BaseLayoutComponent = ({children}: PropsWithChildren) => {
  return (
    <View className="flex-1">
      <LinearGradient colors={['#003545', '#00454A']} className="flex-1">
        {children}
      </LinearGradient>
    </View>
  );
};

export default BaseLayoutComponent;
