import React, {useCallback, useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {twMerge} from 'tailwind-merge';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import movies from '../../shared/datas/movies';

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const today = new Date();

const DetailTicketScreen = () => {
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);
  const [selectedMovieId, setSelectedMovieId] = React.useState<number | null>(
    null,
  );

  const resetBySelectDate = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const getDateInfo = useCallback((offset: number) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      fullDate: date,
    };
  }, []);

  const dates = useMemo(() => {
    return Array.from({length: 5}).map((_, i) => getDateInfo(i));
  }, [getDateInfo]);

  return (
    <BaseLayoutComponent>
      <Header title={'Pesan Tiket'} isWithBack />
      <View className="px-4 gap-2">
        <Text className="font-semibold text-xl">Pilih tanggal</Text>
        <Text>Silahkan pilih tanggal menonton, max 5 hari dari sekarang.</Text>
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
              <Text className={twMerge(isActive && 'text-primary', 'text-xl')}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
                onPress={() => setSelectedMovieId(movie.id)}
                key={movie.id}
                className="max-w-40">
                <Image
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w200' + movie.poster_path,
                  }}
                  className={`w-40 h-60 rounded-md ${
                    isSelected && 'border-2 border-accent'
                  }`}
                />
                <Text
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
    </BaseLayoutComponent>
  );
};

export default DetailTicketScreen;
