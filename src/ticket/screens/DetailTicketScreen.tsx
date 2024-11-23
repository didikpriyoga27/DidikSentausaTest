import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {formatDate} from 'date-fns';
import {id} from 'date-fns/locale';
import React, {useCallback} from 'react';
import {Image, ScrollView, ToastAndroid, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {StackParamList} from '../../AppContainer';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import movies from '../../shared/datas/movies';
import schedules from '../../shared/datas/schedules';
import useTicketStore from '../../shared/store/ticketStore';

const DetailTicketScreen = () => {
  const {goBack} = useNavigation<NavigationProp<StackParamList>>();
  const {params} = useRoute<RouteProp<StackParamList, 'DetailTicket'>>();
  const {removeTicket} = useTicketStore();
  const movie = movies.find(mv => mv.id === params.ticket.movieId);
  const schedule = schedules
    .flatMap(sc => sc.studio_schedules)
    .find(sc => sc.id === params.ticket.scheduleId);

  const handleDone = useCallback(() => {
    removeTicket(params.ticket.id);
    goBack();
    ToastAndroid.show('Terima kasih sudah menonton!', ToastAndroid.SHORT);
  }, [goBack, params.ticket.id, removeTicket]);

  return (
    <BaseLayoutComponent>
      <Header title={'Detail Tiket'} isWithBack />
      <ScrollView contentContainerClassName="w-full">
        <View className="px-4 gap-2">
          <Text className="text-xl">
            {formatDate(params.ticket.date, 'EEEE, dd MMMM yyyy', {
              locale: id,
            }) + '.'}
          </Text>
          <Text className="text-xl">
            {schedule?.time +
              ' - ' +
              schedule?.end_time +
              '. ' +
              schedule?.studio +
              '.'}
          </Text>
        </View>
        <View className="w-full items-center mt-8">
          <Image
            source={{
              uri: 'https://image.tmdb.org/t/p/w500' + movie?.poster_path,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 200, height: 300}}
            className={'rounded-md'}
          />
          <View className="flex-row items-center justify-between w-full px-4 mt-4">
            <Text className="text-lg font-semibold text-accent">
              {movie?.title}
            </Text>
            <Text className="text-2xl font-semibold">Rp {movie?.price}</Text>
          </View>
        </View>
        <View className="p-4 items-center">
          <Text className="font-semibold text-xl">
            ID Tiket: {params.ticket.id}
          </Text>
          <View className="bg-white p-4 rounded-md my-4 items-center">
            <QRCode value={params.ticket.id} size={200} />
            <Text className="text-black mt-4">{params.ticket.id}</Text>
          </View>
          <Text>Tunjukkan QR code di atas kepada petugas tiket.</Text>
        </View>
      </ScrollView>
      <View className="p-4">
        <Button text="Selesai Menonton" onPress={handleDone} />
      </View>
    </BaseLayoutComponent>
  );
};

export default DetailTicketScreen;
