import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {StackParamList} from '../../AppContainer';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';

const MyTicketScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  return (
    <BaseLayoutComponent>
      <Header title="Tiket Saya" />
      <View className="p-4 items-center gap-4">
        <Text className="text-center">Belum ada tiket yang dipesan</Text>
        <Image source={require('../../shared/assets/images/no-ticket.png')} />
        <Button
          text="Pesan tiket sekarang"
          className="mt-8"
          onPress={() => navigate('DetailTicket')}
        />
      </View>
    </BaseLayoutComponent>
  );
};

export default MyTicketScreen;
