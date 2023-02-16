#!/bin/sh

sleep 10
# run migrations
yarn prisma migrate dev --name init

# generate prisma client
yarn prisma generate

# create tables in db
yarn prisma db push --accept-data-loss 

# start server
yarn start