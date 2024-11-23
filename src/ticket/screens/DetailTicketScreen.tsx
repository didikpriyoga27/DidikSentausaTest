import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {twMerge} from 'tailwind-merge';
import BaseLayoutComponent from '../../shared/components/BaseLayoutComponent';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const today = new Date();

const DetailTicketScreen = () => {
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);

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
              onPress={() => setSelectedDateIndex(index)}
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
      <View className="p-4 gap-2">
        <Text className="font-semibold text-xl">Pilih film</Text>
      </View>
    </BaseLayoutComponent>
  );
};

export default DetailTicketScreen;
