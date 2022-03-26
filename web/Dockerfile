FROM node:latest as builder
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:latest
WORKDIR /usr/app
COPY --from=builder /usr/app/package.json ./
ENV NODE_ENV production
RUN npm install
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
EXPOSE 3000
CMD ["npm", "start"]