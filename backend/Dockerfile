FROM node:10
WORKDIR /appDir
ADD . /appDir
COPY ./app/data.json /appDir/
COPY ./app/users.json /appDir/
CMD ["npm", "start"]
EXPOSE 4000