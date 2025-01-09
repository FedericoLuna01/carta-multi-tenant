"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import socket, { joinUserRoom } from '@/lib/socketio';
import { useUser } from '@/utils/user';
import { FullOrder } from '@/types/types';
import { toast } from 'react-hot-toast';

interface OrdersContextType {
  orders: FullOrder[];
  setOrders: (orders: FullOrder[]) => void;
  isLoading: boolean;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();

  // Efecto para cargar órdenes iniciales
  useEffect(() => {
    async function loadOrders() {
      if (user?.slug) {
        try {
          const response = await fetch(`/api/${user.slug}/orders`);
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          }
        } catch (error) {
          console.error('Error al cargar órdenes:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (user) {
      loadOrders();
    }
  }, [user]);

  // Efecto para manejar socket
  useEffect(() => {
    if (user && user.id) {
      joinUserRoom(user.id);

      const handleNewOrder = (newOrder: FullOrder) => {
        setOrders((prevOrders) => [{ ...newOrder, key: newOrder.id }, ...prevOrders]);
        toast.success('¡Nueva orden recibida!', {
          duration: 5000,
          position: 'top-right',
        });
      };

      socket.on('receiveOrder', handleNewOrder);

      return () => {
        socket.off('receiveOrder', handleNewOrder);
      };
    }
  }, [user]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders, isLoading }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders debe ser usado dentro de un OrdersProvider');
  }
  return context;
}