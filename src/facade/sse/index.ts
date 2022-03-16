import sseFacade from './facade';
import { NextFunction, Request, Response } from 'express';
import HttpStatusCode from '../../commons/constants/HttpStatusCode';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function event(req: Request, res: Response, next: NextFunction): Promise <void> {
    try {
        let id = req.params.id;
        let channel = req.params.channel;

        await sseFacade.event(res, id, channel);
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        res.write('retry: 10000\n\n');
    } catch (error) {
        console.log('Error', error);
        next(error);
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
 export async function send(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        let message = req.body.message;
        let ids: string[] = req.body.ids?.split(',');
        let channels: string[] = req.body.channels?.split(',');

        let newres = await sseFacade.send(ids, channels);
        newres.forEach(r => r.write(`data: ${message}\n\n`));
        let result = `Message Sended to ${newres.length} users`; 
        console.log(result);
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        next(error);
    }
}