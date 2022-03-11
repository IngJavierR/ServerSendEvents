import {Sequelize} from 'sequelize-typescript';
import config from '../env/index';
import * as path from 'path';

export const db = new Sequelize({
    dialect: config.database.DB_DIALECT,
    host: config.database.DB_HOST,
    port: Number(config.database.DB_PORT),
    username: config.database.DB_USER,
    password: config.database.DB_PASSWORD,
    database: config.database.DB_NAME,
    storage: config.database.DB_STORAGE,
    models: [path.join(__dirname, '../../models')]
});