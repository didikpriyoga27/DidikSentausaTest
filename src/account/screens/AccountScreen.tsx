import React from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';

const AccountScreen = () => {
  const {width} = useWindowDimensions();

  const account = {
    name: 'Didik Priyoga',
    email: 'didikpriyoga27@gmail.com',
  };

  return (
    <BaseLayoutComponent>
      <Header title="Akun Saya" />
      <View className="p-4 gap-4">
        <Text className="text-xl font-semibold">Nama: {account.name}</Text>
        <Text className="text-xl">Email: {account.email}</Text>
        <Text className="text-xl">Kartu Membership:</Text>
        <View>
          <Image
            source={require('../../shared/assets/images/card_background.jpg')}
            className="rounded-md"
            style={{width: width - 32, height: 240, resizeMode: 'cover'}}
          />
          <Text className="absolute top-4 right-8 text-2xl text-accent font-semibold">
            {account.name}
          </Text>
          <Text className="absolute top-12 right-8">
            Sejak 23 November 2024
          </Text>
        </View>
      </View>
    </BaseLayoutComponent>
  );
};

export default AccountScreen;
