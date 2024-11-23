import {NavigationProp, useNavigation} from '@react-navigation/native';
import {formatDate} from 'date-fns';
import React, {useCallback, useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {twMerge} from 'tailwind-merge';
import {StackParamList} from '../../AppContainer';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import movies from '../../shared/datas/movies';
import schedules from '../../shared/datas/schedules';

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const today = new Date();

const DetailTicketScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();

  const [selectedDateIndex, setSelectedDateIndex] = React.useState<
    number | null
  >(null);
  const [selectedMovieId, setSelectedMovieId] = React.useState<number | null>(
    null,
  );
  const [selectedScheduleId, setSelectedScheduleId] = React.useState<
    number | null
  >(null);

  const resetBySelectDate = useCallback(() => {
    setSelectedMovieId(null);
    setSelectedScheduleId(null);
  }, []);

  const resetBySelectMovie = useCallback(() => {
    setSelectedScheduleId(null);
  }, []);

  const getDateInfo = useCallback((offset: number) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      fullDate: formatDate(date, 'yyyy-MM-dd'),
    };
  }, []);

  const dates = useMemo(() => {
    return Array.from({length: 5}).map((_, i) => getDateInfo(i));
  }, [getDateInfo]);

  const price = useMemo(() => {
    if (selectedMovieId && selectedScheduleId) {
      const movie = movies.find(mv => mv.id === selectedMovieId);
      const schedule = schedules
        .flatMap(sc => sc.studio_schedules)
        .find(sc => sc.id === selectedScheduleId);
      if (movie && schedule) {
        return movie.price;
      }
    }
    return 0;
  }, [selectedMovieId, selectedScheduleId]);

  const handleContinue = useCallback(() => {
    const payload = {
      fullDate: dates[selectedDateIndex!].fullDate,
      selectedMovieId,
      selectedScheduleId,
    };
    navigate('Payment', {payload});
  }, [dates, navigate, selectedDateIndex, selectedMovieId, selectedScheduleId]);

  return (
    <BaseLayoutComponent>
      <Header title={'Pesan Tiket'} isWithBack />
      <ScrollView>
        <View className="px-4 gap-2">
          <Text className="font-semibold text-xl">Pilih tanggal</Text>
          <Text>
            Silahkan pilih tanggal menonton, max 5 hari dari sekarang.
          </Text>
        </View>
        <View className="flex-row justify-between mt-4 px-4">
          {dates.map(({day, date}, index) => {
            const isActive = index === selectedDateIndex;
            return (
              <TouchableOpacity
                key={date}
                onPress={() => {
                  setSelectedDateIndex(index);
                  resetBySelectDate();
                }}
                className={twMerge(
                  'items-center w-20 h-20 justify-center bg-secondary rounded-full',
                  isActive && 'bg-accent',
                )}>
                <Text
                  className={twMerge(
                    isActive && 'text-primary',
                    'text-xl font-semibold',
                  )}>
                  {date}
                </Text>
                <Text
                  className={twMerge(isActive && 'text-primary', 'text-xl')}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedDateIndex !== null && (
          <View className="gap-2">
            <Text className="font-semibold text-xl p-4">Pilih film</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="px-4 gap-4">
              {movies.map(movie => {
                const isSelected = movie.id === selectedMovieId;
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedMovieId(movie.id);
                      resetBySelectMovie();
                    }}
                    key={movie.id}
                    className="max-w-40">
                    <Image
                      source={{
                        uri:
                          'https://image.tmdb.org/t/p/w200' + movie.poster_path,
                      }}
                      className={`w-40 h-60 rounded-md ${
                        isSelected && 'border-2 border-accent'
                      }`}
                    />
                    <Text
                      numberOfLines={2}
                      className={`font-semibold text-xl ${
                        isSelected && 'text-accent'
                      }`}>
                      {movie.title}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
        {selectedMovieId !== null && (
          <View className="gap-2">
            <Text className="font-semibold text-xl p-4">
              Pilih studio dan jadwal
            </Text>
            {schedules.map(schedule => {
              return (
                <View key={schedule.id} className="px-4 gap-2">
                  <Text>{schedule.studio}</Text>
                  <View className="flex-row gap-2">
                    {schedule.studio_schedules.map(studio_schedule => {
                      const isSelected =
                        studio_schedule.id === selectedScheduleId;
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            setSelectedScheduleId(studio_schedule.id)
                          }
                          className={twMerge(
                            'bg-tertiary p-4 rounded-md',
                            isSelected && 'bg-accent',
                          )}
                          key={studio_schedule.id}>
                          <Text
                            className={twMerge(
                              isSelected && 'text-primary',
                              'text-xl font-semibold',
                            )}>
                            {studio_schedule.time}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View className="p-4">
        <Button
          text={'Lanjutkan' + (price > 0 ? ` | Rp ${price}` : '')}
          disabled={price === 0}
          onPress={handleContinue}
        />
      </View>
    </BaseLayoutComponent>
  );
};

export default DetailTicketScreen;
