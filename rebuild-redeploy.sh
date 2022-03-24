#!/bin/bash
source ./.credentials/tcgarena.sh
./login-ecr.sh
./ecs-compose-down.sh
docker compose build
docker compose push
# Service wont drain right away, so we need to wait for it to be drained
echo "Waiting for services to drain"
sleep 20
./ecs-compose-up.sh
# ./cloudflare-dns-update.sh