## use node image ###
FROM node:20.20-alpine

### define the work dir
WORKDIR /app

### copy the packge file to install the requirements
COPY package.json .

### install the requirements
RUN npm install

#### copy the source code file

COPY . .

### Expose the port

EXPOSE 5000



#### give the command 

CMD ["npm", "run", "dev"]
