import React from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Text from '../../shared/components/Text';

const HomeScreen = () => {
  const {width} = useWindowDimensions();
  return (
    <BaseLayoutComponent>
      <View className="p-4">
        <Text className="font-semibold text-2xl">Selamat datang di</Text>
        <Text className="text-accent text-2xl font-semibold">DK MOVIE 🎥</Text>
      </View>
      <View className="p-4 gap-4">
        <Image
          source={require('../../shared/assets/images/dkmovie.jpg')}
          className="rounded-md"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: width - 32,
            height: 280,
            resizeMode: 'cover',
          }}
        />
        <Text className="text-2xl">
          Tempat terbaik untuk menikmati pengalaman menonton film berkualitas
          dengan kenyamanan maksimal.
        </Text>
        <Text className="text-2xl">
          📍 Jl. Jendral Soedirman No. 123, Purwokerto
        </Text>
        <Text className="text-2xl font-semibold text-accent">
          Promo Terbaru
        </Text>
        <Text className="text-2xl">
          🍿 Gratis Popcorn untuk pembelian tiket online.
        </Text>
      </View>
    </BaseLayoutComponent>
  );
};

export default HomeScreen;
