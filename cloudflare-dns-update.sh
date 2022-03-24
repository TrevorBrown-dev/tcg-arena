#!/bin/bash
source ./.credentials/tcgarena.sh

ip=$(./get-site-ip.sh);

# curl -X GET "https://api.cloudflare.com/client/v4/zones/80d63e9af3d7d3e424002fbf8bb2419a/dns_records?type=A&name=www.sponsr.com"\
#      -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
#      -H "X-Auth-Key: 3760462ee77e8067037b39985421174fe357f" \
#      -H "Content-Type: application/json"



curl -X PUT "https://api.cloudflare.com/client/v4/zones/80d63e9af3d7d3e424002fbf8bb2419a/dns_records/c7b3251566a7c64233404a190089fa04" \
     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_GLOBAL_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"A\",\"name\":\"tcgarena.xyz\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":true}"

curl -X PUT "https://api.cloudflare.com/client/v4/zones/80d63e9af3d7d3e424002fbf8bb2419a/dns_records/f9dfbc8a437d423dac22713c87d307f3" \
     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_GLOBAL_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"A\",\"name\":\"www.tcgarena.xyz\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":true}"