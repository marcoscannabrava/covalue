# -------------------------------------
# DEV ENVIRONMENT SETUP
# -------------------------------------
FROM node:12-alpine
# Create app directory - Container CWD
WORKDIR /app
# Put node_modules on environment variable
# ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
# COPY package*.json ./
# Copy files from Host CWD to Container CWD
COPY . .
# Install yarn (faster/lighter) and dependencies
# add this line before if base image doesn't have yarn: npm install -g -s --no-progress yarn && \
RUN yarn
#Expose port and start application
EXPOSE 3000
CMD ["yarn", "start"]