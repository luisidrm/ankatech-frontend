FROM node:20

WORKDIR /app

COPY . .
RUN --mount=type=cache,target=/root/.npm npm install

EXPOSE 3000

RUN npx next build

CMD ["npx", "next", "start"]
