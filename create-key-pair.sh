#!/bin/bash
source ./.credentials/tcgarena.sh
aws ec2 create-key-pair --key-name tcgarena-cluster \
 --query 'KeyMaterial' --output text > /home/trevor/.ssh/tcgarena-cluster.pem