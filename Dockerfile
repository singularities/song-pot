FROM node:4

RUN mkdir /app

WORKDIR /app

COPY dist/bundle/ /app/

RUN cd /app/programs/server && npm install

EXPOSE 80
ENV PORT 80

CMD ["node", "main.js"]
