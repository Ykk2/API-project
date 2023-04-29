FROM node:16.18.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run render-postbuild && npm run build && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all

EXPOSE 8000

CMD ["npm", "start"]
