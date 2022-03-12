import { IsseFacade } from "./interface";
import { Response } from 'express';
import {v4 as uuidv4} from 'uuid';

export interface Clients{
    res: Response,
    channel: string,
    id: string,
    uuid: string
}
var clients: Clients[] = [];

/**
 * @export
 * @implements {IsseModelService}
 */
const sseFacade: IsseFacade = {
    /**
     * @returns {Promise < string >}
     * @memberof sseFacade
     */
    async event(res: Response, id: string, channel: string): Promise<void> {
        let uuid = uuidv4();
        console.log("New subscriber");
        console.log("UUID: ", uuid);
        console.log('Id:', id);
        console.log('Channel:', channel);
        clients.push({
            res: res,
            id: id,
            channel: channel,
            uuid: uuid
        });
    },
    /**
     * @returns {Promise <void>}
     * @memberof sseFacade
     */
     async send(ids: string[], channels: string[]): Promise<Response[]> {
        await this.deleteDisconnected();
        console.log('New Message to');
        console.log('Id', ids);
        console.log('Channels', channels);

        let clientsById: Response[] = [];
        let clientsByChannel: Response[] = [];

        if(ids && ids.length > 0){
            clientsById = clients.filter(cte => ids.includes(cte.id)).map(cte => cte.res);
        }
        if(channels && channels.length > 0){
            clientsByChannel = clients.filter(cte => channels.includes(cte.channel)).map(cte => cte.res);
        }

        return [...new Set(clientsById.concat(clientsByChannel))];
    },
    /**
     * @returns {Promise <void>}
     * @memberof sseFacade
     */
    async deleteDisconnected(): Promise<void> {
        console.log('Listeners Init', clients.length);
        clients = clients.filter(c => !c.res.socket?.destroyed);
        console.log('Listeners Fin', clients.length);
    }
}

export default sseFacade;