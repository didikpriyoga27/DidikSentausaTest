import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import AccountScreen from './account/screens/AccountScreen';
import HomeScreen from './home/screens/HomeScreen';
import AccountIcon from './shared/assets/icons/AccountIcon';
import HomeIcon from './shared/assets/icons/HomeIcon';
import TicketIcon from './shared/assets/icons/TicketIcon';
import TabBarComponent from './shared/components/TabBarComponent';
import {Ticket} from './shared/store/ticketStore';
import colors from './shared/utils/colors';
import BuyTicketScreen from './ticket/screens/BuyTicketScreen';
import DetailTicketScreen from './ticket/screens/DetailTicketScreen';
import MyTicketScreen from './ticket/screens/MyTicketScreen';
import PaymentScreen from './ticket/screens/PaymentScreen';
import PaymentSuccessScreen from './ticket/screens/PaymentSuccessScreen';

interface PaymentPayload {
  fullDate: string;
  selectedMovieId: number | null;
  selectedScheduleId: number | null;
}

export type StackParamList = {
  MyTicket: undefined;
  BuyTicket: undefined;
  Payment: {
    payload: PaymentPayload;
  };
  PaymentSuccess: {
    payload: PaymentPayload;
  };
  DetailTicket: {
    ticket: Ticket;
  };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackParamList>();

const TicketStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyTicket" component={MyTicketScreen} />
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="DetailTicket" component={DetailTicketScreen} />
    </Stack.Navigator>
  );
};

interface ITabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const AppContainer = () => {
  const homeIcon = useCallback(({color, size}: ITabBarIconProps) => {
    return <HomeIcon width={size} height={size} color={color} />;
  }, []);
  const ticketIcon = useCallback(({color, size}: ITabBarIconProps) => {
    return <TicketIcon width={size} height={size} color={color} />;
  }, []);
  const accountIcon = useCallback(({color, size}: ITabBarIconProps) => {
    return <AccountIcon width={size} height={size} color={color} />;
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        tabBar={TabBarComponent}
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{tabBarIcon: homeIcon}}
        />
        <Tab.Screen
          name="Ticket"
          component={TicketStack}
          options={{tabBarIcon: ticketIcon}}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{tabBarIcon: accountIcon}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
