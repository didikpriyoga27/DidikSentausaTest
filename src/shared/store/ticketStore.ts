import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface Ticket {
  id: string;
  date: string;
  movieId: number;
  scheduleId: number;
  price: number;
}

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  removeTicket: (id: string) => void;
}

const useTicketStore = create<TicketStore>()(
  persist(
    set => ({
      tickets: [],
      addTicket: ticket =>
        set(state => ({
          tickets: [...state.tickets, ticket],
        })),
      removeTicket: id =>
        set(state => ({
          tickets: state.tickets.filter(ticket => ticket.id !== id),
        })),
    }),
    {
      name: 'ticket-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useTicketStore;
