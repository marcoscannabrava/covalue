# Startup Script for Google Compute Engine VM
# install Git
sudo apt update && sudo apt install -y github

# install NodeJS
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

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
  server_name _;
  location / {
    proxy_pass http://localhost:8080/;
  }
}
" > default
nginx -s reload

# If repo private: Generate SSH key, Go to Github Repo > Settings > Deploy Keys, Add the key
# Generate Key command
# sudo ssh-keygen
# cat [filename generated bt cmd above]

# Clone repo to /covalue
# git clone git@github.com:marcoscannabrava/covalue.git covalue
cd /covalue

# install dependencies
cd client/ && yarn --prod && yarn build
cd ../server && yarn --prod && yarn start


# Another Default File options for NGINX - Serve Static Files
# echo "
# server {
#   listen 80 default_server;
#   listen [::]:80 default_server;
#   root /covalue/client/build;
#   server_name _;
#   index index.html;
#   location / {}
# }" > default

# Another Default File options for NGINX - Not working
# echo "
# server {
#   listen 80 default_server;
#   listen [::]:80 default_server;
#   root /covalue/;
#   server_name _;
#   location / {
#     proxy_pass http://localhost:8080/;
#   }
# }" > default

# Another Default File options for NGINX - Depends on SSL
# echo "
# server {
#         listen 80;
#         server_name _;
#         return 301 https://$host$request_uri;
# }

# server {
#         listen 443 ssl;
#         server_name _;
#         # ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
#         # ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

#         ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
#         ssl_prefer_server_ciphers on;
#         ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
#         location /  {
#                 proxy_pass    http://localhost:3010;
#                 proxy_http_version 1.1;
#                 proxy_set_header Upgrade $http_upgrade;
#                 proxy_set_header Connection 'upgrade';
#                 proxy_set_header Host $host;
#                 proxy_cache_bypass $http_upgrade;
#         }
# }
# " > default

echo "
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name _;

  location / {
    proxy_pass http://localhost:8080/;
  }
}

server {
  listen 443 ssl;
  server_name _;

  location /  {
    proxy_pass http://localhost:8080/;
  }
}
" > default


# -- Important Info
# sudo su # gets root access in VM instance - no pswd required