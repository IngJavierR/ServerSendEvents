import { Response } from 'express';
/**
 * @export
 * @interface IsseFacade
 */
export interface IsseFacade {

    /**
     * @returns {Promise<Response>}
     * @memberof IsseFacade
     */
    event(res: Response, id: string, channel: string): Promise<void>;

    /**
     * @returns {Promise<void>}
     * @memberof IsseFacade
     */
    send(ids: string[], channels: string[]): Promise<Response[]>;

     /**
     * @returns {Promise<void>}
     * @memberof IsseFacade
     */
    deleteDisconnected(): Promise<void>;

    /**
     * @returns {Promise<void>}
     * @memberof IsseFacade
     */
    keepAlive(): Promise<void>;
}