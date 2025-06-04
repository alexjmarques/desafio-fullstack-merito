# frontend/Dockerfile
FROM node:20-slim

RUN corepack enable \
 && corepack prepare yarn@1.22.22 --activate


RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      build-essential python3 pkg-config libssl-dev ca-certificates git curl \
 && rm -rf /var/lib/apt/lists/*


ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /opt/app


COPY app/package.json ./
RUN yarn install --frozen-lockfile

COPY app/ .
RUN yarn build

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["yarn", "start"]
