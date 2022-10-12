FROM node:16

WORKDIR /usr/src/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm i -g pnpm
RUN pnpm config set auto-install-peers=true
RUN pnpm i

# Bundle app source
COPY . .

# Migrate
RUN pnpm run db:generate

# Creates a "dist" folder with the production build
RUN pnpm build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]