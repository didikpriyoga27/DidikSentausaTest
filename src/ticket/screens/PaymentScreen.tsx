import {RouteProp, useRoute} from '@react-navigation/native';
import {formatDate} from 'date-fns';
import {id} from 'date-fns/locale';
import React, {useCallback, useMemo, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {StackParamList} from '../../AppContainer';
import BankIcon from '../../shared/assets/icons/BankIcon';
import CopyIcon from '../../shared/assets/icons/CopyIcon';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import movies from '../../shared/datas/movies';
import schedules from '../../shared/datas/schedules';

const PaymentScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {params} = useRoute<RouteProp<StackParamList, 'Payment'>>();

  const schedule = useMemo(() => {
    return schedules
      .flatMap(sc => sc.studio_schedules)
      .find(sc => sc.id === params.payload.selectedScheduleId);
  }, [params.payload.selectedScheduleId]);

  const movie = useMemo(
    () => movies.find(mv => mv.id === params.payload.selectedMovieId),
    [params.payload.selectedMovieId],
  );

  const handleVerification = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <BaseLayoutComponent>
      <Header title={'Pembayaran'} isWithBack />
      <ScrollView contentContainerClassName="w-full">
        <View className="px-4 gap-2">
          <Text className="text-xl">
            {formatDate(params.payload.fullDate, 'EEEE, dd MMMM yyyy', {
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
        <View className="p-4">
          <Text className="text-lg font-semibold">Metode Pembayaran</Text>
          <View className="bg-tertiary rounded-md p-4 mt-4 flex-row items-center gap-4">
            <BankIcon />
            <View className="flex-row items-center justify-between flex-1">
              <View>
                <Text className="text-lg font-semibold">Bank Transfer</Text>
                <Text className="text-lg font-semibold">
                  1234 1234 1234 1234
                </Text>
              </View>
              <TouchableOpacity>
                <CopyIcon />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-4">
            Untuk melanjutkan proses pemesanan tiket, silahkan transfer ke nomor
            tersebut sesuai nominal yang tertera, lalu klik tombol{' '}
            <Text className="font-semibold">Verifikasi Pembayaran.</Text>
          </Text>
        </View>
      </ScrollView>
      <View className="p-4">
        <Button
          text="Verifikasi Pembayaran"
          isLoading={isLoading}
          onPress={handleVerification}
        />
      </View>
    </BaseLayoutComponent>
  );
};

export default PaymentScreen;
