FROM alpine:3.5

MAINTAINER WB

RUN apk add mongodb --update-cache --repository http://dl-4.alpinelinux.org/alpine/edge/testing --allow-untrusted && \
	rm -rf /var/cache/apk/*

RUN mkdir -p /data/db

#Mount volume for data
VOLUME ["/data/db"]

#Run mongo
CMD ["mongod"]

EXPOSE 27017