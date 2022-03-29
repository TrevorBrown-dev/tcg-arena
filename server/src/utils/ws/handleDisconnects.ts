import ws, { WebSocketServer } from 'ws';
import { Lobby } from '../../entities/Lobby';

export const handleDisconnects = (wsServer: WebSocketServer) => {
    wsServer.on('connection', (ws) => {
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
            if (
                data?.payload?.variables?.watchLobbyId &&
                data?.payload?.variables?.accountId
            ) {
                //if we already set an onclose listener for this ws, dont do it again
                if (ws.onclose) return;

                ws.onclose = () => {
                    const lobbyId = data.payload.variables.watchLobbyId;
                    const accountId = data.payload.variables.accountId;
                    //This happens when the subscription is closed
                    Lobby.leaveLobby(lobbyId, accountId);
                };
            }
        };
    });
};
