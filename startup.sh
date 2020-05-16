# Startup Script for Server VM
# install Git
sudo apt update && sudo apt install -y github

# install NodeJS
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs

# install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn

# install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update && sudo apt-get install -y mongodb-org
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
rm default
cp /covalue/server/proxy/nginx.conf .
nginx -s reload

# If repo private: Generate SSH key, Go to Github Repo > Settings > Deploy Keys, Add the key
# Generate Key command
# sudo ssh-keygen
# cat [filename generated bt cmd above]

# Clone repo to /covalue
cd /
# git clone git@github.com:marcoscannabrava/covalue.git covalue

# install dependencies
cd client/ && yarn --prod && yarn build
cd ../server && yarn --prod && yarn start

# -- Important Info
# sudo su # gets root access in VM instance - no pswd required
# new additions
