import * as bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import HttpStatusCode from '../../commons/constants/HttpStatusCode';
import { ErrorTo } from '../../to/ErrorTo';
import { ParametersError, UnauthorizedError, ForbiddenError, NotFoundError } from '../error';
/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
    // express middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());

    // cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials'
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
}

/**
 * @export
 * @param {express.Application} app
 */
export function initErrorHandler(app: express.Application): void {
    app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

        console.error(`[Error] - Message: [${error.message}]\nStack: [${error.stack||''}]`);
        if (error instanceof ParametersError || error instanceof UnauthorizedError || 
            error instanceof ForbiddenError || error instanceof NotFoundError) {
            let errorTo = new ErrorTo('0', error.status.toString(), error.message, '');
            res.status(error.status).send(errorTo);
        }else{
            let errorTo = new ErrorTo('0', error.message, 'Ocurrió un error inesperado', '');
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(errorTo);
        }
        
    });
}
