# -------------------------------------
# DEV ENVIRONMENT SETUP
# -------------------------------------
FROM node:12-alpine
# Create app directory - Container CWD
WORKDIR /app
# Put node_modules on environment variable
ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
COPY package*.json ./
# Install yarn (faster/lighter) and dependencies
# add this line before if base image doesn't have yarn: npm install -g -s --no-progress yarn && \
RUN yarn
# Copy files from Host CWD to Container CWD
COPY . .
#Expose port and start application
EXPOSE 8000
CMD ["nodemon", "./app.js"]
# CMD ["yarn", "start"] # for Prod Env