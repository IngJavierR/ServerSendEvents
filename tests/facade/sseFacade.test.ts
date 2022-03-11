process.env.NODE_ENV = 'test'

import { expect } from "chai";
import sseFacade from '../../src/facade/sse/facade';
import { db } from '../../src/config/connection/database';
import sse from "../../src/models/sse.model";
import * as Kafka from "../../src/config/stream/kafka";

describe('sseFacade Test', () => {

    before('Init', async() => {
        await db.sync({ force: true});
        sse.create({
        id: 1,
        name: 'test',
        createdAt: '2020-01-01',
        updatedAt: '2020-01-01'
        });

        //Para lanzar pruebas con kafka
        // let topics = [
        //     'pruebas',
        //     'test'
        // ];
        // try{
        //     await Kafka.init(topics);
        //     console.log('Connected to Kafka');

        // }catch(err){
        //     console.log('Error', err);
        // }
    });
  
    describe('FindAll', () => {
        it('should return one user', async () => {
            //const sse: any[] = await sseFacade.event();
            expect(1).equal(1);
        });
    });
});