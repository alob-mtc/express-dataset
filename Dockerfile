# base image
FROM node:12-alpine
# create the working dir
RUN mkdir -p /src/expresschallenge
# set working dir
WORKDIR /src/expresschallenge
#copy the package.json file over
COPY ./package.json /src/expresschallenge
# install dependencies
RUN npm install --only=prod
# copy the app over
COPY . /src/expresschallenge
# expose a port
EXPOSE 8000
# set default cmd
CMD [ "yarn", "start" ]
