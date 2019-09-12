# BUILD: node@10.16.3-alpine
FROM node@sha256:77c898d0da5e7bfb6e05c9a64de136ba4e03889a72f3c298e95df822a38f450d AS build

EXPOSE 3000/tcp

ENV ENDPOINT=http://35.157.217.31

WORKDIR /suitegen

CMD ["su-exec", "suitegen", "sh", "suite-generator.sh"]

COPY . .

RUN addgroup -g 10000 -S suitegen && \
    adduser  -u 10000 -S suitegen -G suitegen -H -s /bin/false && \
    chown -R suitegen:suitegen . && \
    apk --no-cache add su-exec && \
    mkdir -p /var/log/suitegen && \
    chown -R suitegen:suitegen /var/log/suitegen && \
    npm install && \
    npm install webpack 