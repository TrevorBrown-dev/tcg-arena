import ws, { WebSocketServer } from 'ws';
import { Lobby } from '../../entities/Lobby';
import { PreGameLobby } from '../../game/PreGameLobby';
import { parseJWT } from '../parseJWT';

export const handleDisconnects = (wsServer: WebSocketServer) => {
    wsServer.on('connection', (ws, req) => {
        //This happens when a subscription is made
        ws.onmessage = (e) => {
            //Grab the data from the subscription
            const data = JSON.parse(e.data.toString());

            //This is the initial payload from the client, we dont care about this payload
            if (data.type === 'connection_init') return;

            //If we got here this is an instance of a subscription happening

            //The payload includes the graphql subscription info and variables
            //Right now the only way I know of how to know exactly what the subscription is is
            //by looking at the payload for specific keys
            if (data?.payload?.variables?.preGameLobbyId) {
                //if we already set an onclose listener for this ws, dont do it again
                if (ws.onclose) return;

                ws.onclose = () => {
                    if (!req.headers.cookie) return;
                    const lobbyId = data.payload.variables.preGameLobbyId;
                    const accountId = parseJWT(req.headers.cookie)?.id;
                    if (!lobbyId || !accountId) return;
                    //This happens when the subscription is closed
                    PreGameLobby.leave(lobbyId, parseInt(accountId));
                };
            }
        };
    });
};
