#!/bin/sh

# run migrations
yarn prisma migrate dev --name init

# generate prisma client
yarn prisma generate

# create tables in db
yarn prisma db push --accept-data-loss 

# start server in dev mode
yarn start:dev