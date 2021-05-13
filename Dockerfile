FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
EXPOSE 5432
CMD ["npm", "start"]
