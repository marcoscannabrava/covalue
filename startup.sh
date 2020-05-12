# Startup Script for Google Compute Engine VM
# install Git, NodeJS
sudo apt update && sudo apt install -y git nodejs

# install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn

# install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# install Nginx
sudo apt install curl gnupg2 ca-certificates lsb-release
echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
  | sudo tee /etc/apt/sources.list.d/nginx.list
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
sudo apt update && sudo apt install -y nginx

# Configure Nginx and reload it
sudo su -
cd /etc/nginx/sites-enabled
echo "
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /covalue;
  index index.html;
  server_name _;
  location / {
    proxy_pass http://localhost:8080/;
  }
}
" > default
nginx -s reload

# clone repo
# gcloud source repos clone [REPO_NAME] --project=[PROJECT_NAME]
git clone git@github.com:marcoscannabrava/covalue.git
cd covalue
# install dependencies
cd client/ && yarn --prod && yarn build
cd ../server && yarn --prod && yarn start