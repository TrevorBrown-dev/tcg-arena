#!/bin/bash
source ./.credentials/tcgarena.sh
KEY_PAIR=tcgarena-cluster
    ecs-cli up \
      --keypair $KEY_PAIR  \
      --capability-iam \
      --region us-east-1 \
      --size 1 \
      --instance-type t3.micro \
      --tags project=tcgarena,owner=TCGArena \
      --cluster-config tcgarena \
      --ecs-profile tcgarena \
      --force