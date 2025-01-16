"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import socket, { joinUserRoom } from '@/lib/socketio';
import { useUser } from '@/utils/user';
import { FullOrder } from '@/types/types';
import { toast } from 'react-hot-toast';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface OrdersContextType {
  orders: FullOrder[];
  setOrders: (orders: FullOrder[]) => void;
  isLoading: boolean;
  totalItems: number;
  fetchOrders: (page?: number, pageSize?: number) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const user = useUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const fetchOrders = async (page?: number, pageSize?: number) => {
    if (!user?.slug) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const currentPage = page ?? parseInt(searchParams.get('page') ?? '1');
      const currentPageSize = pageSize ?? parseInt(searchParams.get('pageSize') ?? '10');

      // Construir la URL con los parámetros
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('pageSize', currentPageSize.toString());

      // Actualizar la URL
      router.push(`${pathname}?${params.toString()}`);

      const response = await fetch(`/api/${user.slug}/orders?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.items);
        setTotalItems(data.total);
      }
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar órdenes iniciales
  useEffect(() => {
    // Solo hacer el fetch inicial si no hay parámetros de paginación en la URL
    if (!searchParams.has('page') && !searchParams.has('pageSize')) {
      fetchOrders(1, 10);
    }
  }, [user?.slug]); // Solo depende del slug del usuario

  // Efecto para manejar socket
  useEffect(() => {
    if (!user?.id) return;

    joinUserRoom(user.id);

    const handleNewOrder = (newOrder: FullOrder) => {
      const currentPage = parseInt(searchParams.get('page') ?? '1');
      
      // Incrementar el total de órdenes
      setTotalItems((prev) => prev + 1);
      
      // Solo actualizar la lista si estamos en la primera página
      if (currentPage === 1) {
        setOrders((prevOrders) => [{ ...newOrder, key: newOrder.id }, ...prevOrders]);
      }

      toast.success('¡Nueva orden recibida!', {
        duration: 5000,
        position: 'top-right',
      });
    };

    socket.on('receiveOrder', handleNewOrder);

    return () => {
      socket.off('receiveOrder', handleNewOrder);
    };
  }, [user, searchParams]); // Agregamos searchParams como dependencia

  return (
    <OrdersContext.Provider value={{ orders, setOrders, isLoading, totalItems, fetchOrders }}>
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