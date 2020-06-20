FROM node:12.18.1-alpine3.12
RUN npm install --global npm@6.14.5

ENV HOME=/home/carolina/documentos/desafio_zhealth

COPY package.json npm-shrinkwrap.json $HOME/library/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/library
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/library
RUN chown -R app:app $HOME/*
USER app

