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
        await sseFacade.event(res, req.params.id);
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive'
          });
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
        let id: string[] = req.body.id.split(',');
        let newres = await sseFacade.send(id);
        newres.forEach(r => r.write(`data: ${message}\n\n`));
        console.log('Message Sended to ' + newres.length + ' users');
        res.status(HttpStatusCode.OK).end();
    } catch (error) {
        next(error);
    }
}