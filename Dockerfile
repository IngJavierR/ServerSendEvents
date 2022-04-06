FROM node:12-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g typescript
RUN npm install
COPY . .
RUN npm install -g swagger-jsdoc
#RUN swagger-jsdoc -d swaggerDef.js -o swagger.json
RUN npm run build

FROM node:12-slim AS release 
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
#COPY --from=build /usr/src/app/swagger.json ./build/swagger.json
COPY --from=build /usr/src/app/swaggerDef.js ./build/swaggerDef.js
EXPOSE 9220
CMD node ./build/src/config/server/index.js