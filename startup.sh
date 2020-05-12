
# install MongoDB, Git, NodeJS
sudo apt update && sudo apt install mongodb git nodejs
# install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
# clone repo
git clone git@github.com:marcoscannabrava/covalue.git
cd covalue
# install dependencies
cd client/ && yarn --prod && yarn build
cd ../server && yarn --prod && yarn start