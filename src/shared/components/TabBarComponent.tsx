import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const TabBarComponent = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;

  return (
    <View className="flex-row bg-tertiary">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center p-6">
            {options.tabBarIcon?.({
              color: isFocused ? '' : 'white',
              size: 24,
              focused: isFocused,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBarComponent;
