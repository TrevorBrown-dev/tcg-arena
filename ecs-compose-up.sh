#!/bin/bash
source ./.credentials/tcgarena.sh
ecs-cli compose --project-name tcgarena  --file docker-compose.yml \
--debug service up  \
--cluster tcgarena-cluster \
--deployment-max-percent 100 --deployment-min-healthy-percent 0 \
--region us-east-1 --ecs-profile tcgarena --cluster-config tcgarena 
# --health-check-grace-period 30 \
# --target-groups "targetGroupArn=arn:aws:elasticloadbalancing:us-east-2:311799979048:targetgroup/sponsrv2-network-target/a6b34118c46c7557,containerName=nginx,containerPort=80" \