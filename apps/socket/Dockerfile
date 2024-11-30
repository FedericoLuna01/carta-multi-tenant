FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/socket/package*.json ./apps/socket/

RUN npm install

COPY . .

RUN npm run build --workspace=socket

EXPOSE 3001

CMD ["npm", "run", "start", "--workspace=socket"] 