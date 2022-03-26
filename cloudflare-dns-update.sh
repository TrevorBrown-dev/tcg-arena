#!/bin/bash
source ./.credentials/tcgarena.sh

ip=$(./get-site-ip.sh);
echo $ip;

# curl -X GET "https://api.cloudflare.com/client/v4/zones/24c99124c7371ad60324b7ba2128bad4/dns_records?type=A&name=www.tcgarena.xyz"\
#      -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
#      -H "X-Auth-Key: 3760462ee77e8067037b39985421174fe357f" \
#      -H "Content-Type: application/json" 



curl -X PUT "https://api.cloudflare.com/client/v4/zones/24c99124c7371ad60324b7ba2128bad4/dns_records/d83f43c91752d0358dd688067c41a8ad" \
     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_GLOBAL_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"A\",\"name\":\"tcgarena.xyz\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":true}"

curl -X PUT "https://api.cloudflare.com/client/v4/zones/24c99124c7371ad60324b7ba2128bad4/dns_records/80d94d08a8f0092ca7b9b6d916413dbe" \
     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_GLOBAL_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"A\",\"name\":\"www.tcgarena.xyz\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":true}"