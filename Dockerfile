FROM node:18.13.0

WORKDIR /var

RUN mkdir /mb-labs
RUN mkdir /schema/

COPY ./dist/ /var/mb-labs/
COPY ./pm2-config.json /var/mb-labs/
COPY ./package.json /var/mb-labs/
COPY ./schema /var/mb-labs/schema
COPY ./script.sh /var/mb-labs/
WORKDIR /var/mb-labs

RUN npm install pm2 -g
RUN npm install
RUN npx prisma generate

CMD ["sh", "script.sh"]