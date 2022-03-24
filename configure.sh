#!/bin/bash
source ./.credentials/tcgarena.sh
set -e
PROFILE_NAME=tcgarena
CLUSTER_NAME=tcgarena-cluster
REGION=us-east-1
LAUNCH_TYPE=EC2


ecs-cli configure profile --profile-name "$PROFILE_NAME" --access-key "$AWS_ACCESS_KEY_ID" --secret-key "$AWS_SECRET_ACCESS_KEY"
ecs-cli configure --cluster "$CLUSTER_NAME" --default-launch-type "$LAUNCH_TYPE" --region "$REGION" --config-name "$PROFILE_NAME"