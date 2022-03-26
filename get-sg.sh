source ./.credentials/tcgarena.sh
aws ec2 describe-subnets --filters Name=tag:project,Values=tcgarena --output json \
 | jq ".Subnets[].SubnetId" | \
xargs -ISUBNET  aws efs create-mount-target \
 --file-system-id fs-0c56f6ad80653b973 --subnet-id SUBNET


efs_sg=$(aws efs describe-mount-targets --file-system-id fs-0c56f6ad80653b973 --output json \
    | jq ".MountTargets[0].MountTargetId" \
     | xargs -IMOUNTG aws efs describe-mount-target-security-groups \
     --mount-target-id MOUNTG --output json | jq ".SecurityGroups[0]" | xargs echo )

     vpc_sg="$(aws ec2 describe-security-groups  \
 --filters Name=tag:project,Values=tcgarena --output json \
 | jq '.SecurityGroups[].GroupId' | xargs echo)"


 aws ec2 authorize-security-group-ingress \
--group-id $efs_sg \
--protocol tcp \
--port 2049 \
--source-group $vpc_sg \
--region us-east-1