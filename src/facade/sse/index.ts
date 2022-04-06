import sseFacade from './facade';
import { NextFunction, Request, Response } from 'express';
import HttpStatusCode from '../../commons/constants/HttpStatusCode';
import { resolveScopes } from 'sequelize-typescript';
import config from '../../config/env/index';

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

        let timeout = config.sseTimeout * 60000;
        console.log('timeout ', timeout);
        req.setTimeout(timeout);

        await sseFacade.event(res, id, channel);
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'Keep-Alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.setHeader('Transfer-Encoding', 'identity');
        res.flushHeaders();
        res.write('retry: 5\n\n');
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

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
 export async function options(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        console.log("OPTIONS SUBS");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader(
        "Access-Control-Allow-Headers",
        "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
        );
        res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, OPTIONS, PATCH"
        );
        res.status(HttpStatusCode.OK);
    } catch (error) {
        next(error);
    }
}