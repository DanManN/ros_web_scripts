#!/usr/bin/env bash
if [ -z "$1" ]; then
	FQDN="localhost"
else
	FQDN="$1"
fi
echo Signing for $FQDN
# openssl req -nodes -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 356 -subj "/C=US/ST=Some-State/O=Blah/CN=localhost"
openssl req -nodes -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 356 -subj "/CN=$FQDN"
