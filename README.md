# Descripción

Un e-commerce bien cool

## Correr en dev

1. Clonar el repo
2. Crear una copia de `.env.template` a `.env` y completar variables de entorno
3. Instalar dependencias `npm install`
4. Levantar base de datos `docker-compose up` o `docker-compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Llenar la DB con datos de prueba `npm run seed`
7. Correr en desarrollo `npm run dev` o `npm run dev:turbo`
