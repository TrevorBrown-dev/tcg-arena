#!/bin/bash
source ./.credentials/tcgarena.sh
ecs-cli ps --cluster-config tcgarena --ecs-profile tcgarena | grep "RUNNING" | grep "nginx" | head -1 | awk '{print $3}' | awk -F: '{print $1}'