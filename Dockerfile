# Step 1: Use the official Node.js image
FROM node:22-alpine

# env variables should specified when we run the docker run command, added here for demonstration
ENV JWT_SECRET=TheSecReTWOrLdTheSecReTWOrLdTheSecReTWOrLdTheSecReTWOrLd \
    DB_HOST=postgres_db   \
    DB_PORT=5432 \
    DB_PASSWORD=postgres \
    DB_USERNAME=postgres \
    DB_NAME=doctor_db


RUN mkdir -p /home/app
WORKDIR /home/app

COPY . /home/app

RUN npm install

CMD ["npm", "run", "start:dev"]

