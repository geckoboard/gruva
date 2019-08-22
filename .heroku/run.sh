#!/bin/bash

RELEASE="oauth2_proxy-2.2.0.linux-amd64.go1.8.1"
wget https://github.com/bitly/oauth2_proxy/releases/download/v2.2/$RELEASE.tar.gz -O oauth2_proxy.tar.gz

tar -xzf oauth2_proxy.tar.gz

ls -alF .

mv $RELEASE/oauth2_proxy bin/
