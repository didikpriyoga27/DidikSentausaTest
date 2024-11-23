import {NavigationProp, useNavigation} from '@react-navigation/native';
import {formatDate} from 'date-fns';
import {id} from 'date-fns/locale';
import React, {useCallback} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {twMerge} from 'tailwind-merge';
import {StackParamList} from '../../AppContainer';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import movies from '../../shared/datas/movies';
import schedules from '../../shared/datas/schedules';
import useTicketStore, {Ticket} from '../../shared/store/ticketStore';

const MyTicketScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  const {tickets} = useTicketStore();

  const renderItem = useCallback(
    ({item}: {item: Ticket}) => {
      const schedule = schedules
        .flatMap(sc => sc.studio_schedules)
        .find(sc => sc.id === item.scheduleId);
      const movie = movies.find(mv => mv.id === item.movieId);

      return (
        <TouchableOpacity
          onPress={() => navigate('DetailTicket', {ticket: item})}
          className="bg-tertiary rounded-md p-4 mb-4">
          <Text>{item.id}</Text>
          <View className="flex-row items-center gap-2 mt-4">
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + movie?.poster_path,
              }}
              className="w-28 h-40 rounded-md"
            />
            <View>
              <View className="flex-1">
                <Text className="text-xl text-accent">{movie?.title}</Text>
                <Text className="text-2xl font-semibold">{item.price}</Text>
              </View>
              <Text>
                {formatDate(item.date, 'EEEE, dd MMMM yyyy', {
                  locale: id,
                }) + '.'}
              </Text>
              <Text>
                {schedule?.time +
                  ' - ' +
                  schedule?.end_time +
                  '. ' +
                  schedule?.studio +
                  '.'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigate],
  );

  const ListEmptyComponent = useCallback(() => {
    return (
      <View className="items-center mt-40">
        <Text className="text-center">Belum ada tiket yang dipesan</Text>
        <Image source={require('../../shared/assets/images/no-ticket.png')} />
      </View>
    );
  }, []);

  return (
    <BaseLayoutComponent>
      <Header title="Tiket Saya" />
      <View className="items-center flex-1">
        <FlatList
          data={tickets}
          renderItem={renderItem}
          className={twMerge('w-full', tickets.length > 0 && 'flex-1')}
          contentContainerClassName="p-4"
          ListEmptyComponent={ListEmptyComponent}
        />
        <View className="p-4 w-full">
          <Button
            text="Pesan tiket sekarang"
            onPress={() => navigate('BuyTicket')}
          />
        </View>
      </View>
    </BaseLayoutComponent>
  );
};

export default MyTicketScreen;
