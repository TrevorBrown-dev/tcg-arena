#!/bin/bash
source ./.credentials/tcgarena.sh
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 934932360625.dkr.ecr.us-east-1.amazonaws.com/tcgarena