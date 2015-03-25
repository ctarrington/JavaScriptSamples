#!/bin/bash

echo "Installing node"
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs

echo "installing global node packages"
cd /vagrant
sudo npm install -g node-inspector