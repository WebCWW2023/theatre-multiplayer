#!/bin/bash
#Stopping existing node servers
echo "Stopping theatre Multiplayer"

# pm2 stop --silent office-mp 
# pm2 delete --silent office-mp 

pm2 describe theatre-mp > /dev/null
RUNNING=$?

if [ "${RUNNING}" == 0 ]; then
  pm2 delete --silent theatre-mp
fi;