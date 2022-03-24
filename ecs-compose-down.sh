#!/bin/bash
source ./.credentials/tcgarena.sh
ecs-cli compose --project-name tcgarena  --file docker-compose.yml \
--debug service down  \
--region us-east-1 --ecs-profile tcgarena --cluster-config tcgarena