# filepath: /Users/paulpreuvost/Documents/SUPINFO/B3/3WEBD/Enzo-Clicker/frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]