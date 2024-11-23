import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {formatDate} from 'date-fns';
import {id} from 'date-fns/locale';
import LottieView from 'lottie-react-native';
import React, {useCallback, useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import {StackParamList} from '../../AppContainer';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import movies from '../../shared/datas/movies';
import schedules from '../../shared/datas/schedules';

const PaymentSuccessScreen = () => {
  const {reset} = useNavigation<NavigationProp<StackParamList>>();
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

  const handleGoBack = useCallback(() => {
    reset({index: 0, routes: [{name: 'MyTicket'}]});
  }, [reset]);

  return (
    <BaseLayoutComponent>
      <Header title={'Sukses'} />
      <ScrollView contentContainerClassName="w-full">
        <View className="px-4 gap-2">
          <Text className="text-2xl font-semibold text-accent">
            {movie?.title}
          </Text>
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
        <View className="items-center mt-8">
          <LottieView
            source={require('../../shared/assets/json/success.json')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 240, height: 240}}
            autoPlay
            loop
          />
          <Text className="text-2xl font-semibold text-center">
            Rp {movie?.price}
          </Text>
          <Text>Pembayaran berhasil dilakukan</Text>
          <Text className="mt-4 text-accent text-2xl text-center">
            Selamat anda mendapatkan promo Gratis 1 PopCorn🍿
          </Text>
        </View>
      </ScrollView>
      <View className="p-4">
        <Button text="Lihat tiket saya" onPress={handleGoBack} />
      </View>
    </BaseLayoutComponent>
  );
};

export default PaymentSuccessScreen;
