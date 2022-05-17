FROM node:17

#установим браузер и все что для него нужно
RUN apt-get update && \
 apt-get install chromium -y

#установим typescript
RUN npm install -g typescript

WORKDIR /var/www