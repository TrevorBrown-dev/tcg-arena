source ./.credentials/tcgarena.sh

aws efs create-file-system \
    --performance-mode generalPurpose \
    --throughput-mode bursting \
    --encrypted \
    --tags Key=Name,Value=tcgarena-db-filesystem 