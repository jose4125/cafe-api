FROM node:10.13
ENV NODE_ENV development
WORKDIR /usr/src/app

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent
COPY . .
EXPOSE 5000

ENTRYPOINT ["/tini", "--"]
CMD npm start
