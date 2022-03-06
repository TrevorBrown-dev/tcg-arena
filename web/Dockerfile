FROM node:12 as builder
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:12
WORKDIR /usr/app
COPY --from=builder /usr/app/package.json ./
RUN npm install
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public

CMD ["npm", "start"]