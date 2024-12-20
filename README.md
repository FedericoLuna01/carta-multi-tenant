# Carta

Carta es un menú digital donde los restaurants o bares van a poder mostrar su productos y los clientes van a poder verlos y  
hacer pedidos. La aplicación cuenta con un panel de administración donde los dueños de los locales van a poder gestionar sus productos,  
categorías, y pedidos en tiempo real.

Actualmente está en desarrollo, aunque el lanzamiento.

# Lenguajes y tecnologías

- NextJS
- Typescript
- Tailwind
- ShadCN
- Prisma
- Socket IO
- AuthJS
- Zod
- Zustand
- Cloudinary
- DND Kit

# Funciones

- Admin:
  - CRUD de usuarios (cada usuario es un subdominio)
- Cliente:
  - CRUD de categorías, subcategorías y productos.
  - Ver ordenes en tiempo real
- Realizar pedidos para takeaway, delivery y las mesas del restaurant.
- Rutas protegidas por roles
- Subdominios automáticos

# To-do

- [x] Migrar a monorepo con el server de SocketIO
- [ ] Migrar axios a fetch
- [ ] Migrar react-hot-toast a toast de ShadCN
- [ ] Agregar posibilidad de pagar en la app
- [ ] Agregar analytics de user y admin

# Env

```
  DATABASE_URL=
  DIRECT_URL=
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME =
```
