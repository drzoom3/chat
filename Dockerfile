FROM node:8

ADD . /app
WORKDIR /app

#RUN npm i
#RUN npm run build

ENV PORT=8080 
EXPOSE 8080

CMD ["npm", "start"]