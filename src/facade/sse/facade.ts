import { IsseFacade } from "./interface";
import { Response } from 'express';
import {v4 as uuidv4} from 'uuid';

interface Clients{
    res: Response,
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
    async event(res: Response, id: string): Promise<void> {
        let uuid = uuidv4();
        console.log("UUID ", uuid);
        console.log('Id', id);
        clients.push({
            res: res,
            id: id,
            uuid: uuid
        });
    },
    /**
     * @returns {Promise <void>}
     * @memberof sseFacade
     */
     async send(ids: string[]): Promise<Response[]> {
        console.log('Id', ids);
        await this.deleteDisconnected();
        return clients.filter(cte => ids.includes(cte.id)).map(cte => cte.res);
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