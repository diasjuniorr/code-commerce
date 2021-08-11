#!/bin/bash
if [! -f ".env"]; then
    cp .env.example .env
fi

yarn 
yarn typeorm migration:run
yarn start:dev