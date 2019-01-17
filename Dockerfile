FROM mhart/alpine-node

WORKDIR /home/

COPY index.js .
COPY credentials.json .
COPY package.json .
COPY yarn.lock .

RUN yarn install

CMD ["yarn", "run", "main"]
