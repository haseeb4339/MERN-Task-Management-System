## use node image ###
FROM node:20.20-alpine

### define working dir
WORKDIR /app

#####
COPY package.json .

#### install the dependancies 
RUN npm install

### copy the source code

COPY . .

#### EXPOSE THE PORT

EXPOSE 5001

#### give the command 
CMD ["npm", "start"]