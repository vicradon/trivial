FROM node:12-alpine
WORKDIR /trivial
COPY . .
EXPOSE 80
CMD ["npm","start"]