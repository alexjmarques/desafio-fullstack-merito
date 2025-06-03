FROM node:lts-slim AS build

WORKDIR /opt/app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY app/ .

COPY app/package.json app/yarn.lock ./

RUN yarn install --immutable

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
