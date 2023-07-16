FROM node:18-alpine
RUN apk add bash sudo psmisc

CMD ["/app/bin/start.sh"]