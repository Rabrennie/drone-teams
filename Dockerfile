FROM node:12.7.0-alpine
ADD args.js /bin/
ADD index.js /bin/
ADD package.json /bin/
ADD yarn.lock /bin/
WORKDIR /bin/
RUN yarn install
CMD ["node", "/bin/index.js"]