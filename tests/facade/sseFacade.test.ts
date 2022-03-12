process.env.NODE_ENV = 'test'

import { expect } from "chai";
import express from'express';
import sseFacade from "../../src/facade/sse/facade";
import sinon from "sinon";
import { Socket } from "dgram";

describe('sseFacade Test', () => {

    describe('Register Events', () => {
        it('should register new subscriber id: "1", channel: ""', async () => {
            const res = Object.assign({},express.response);
            let id: string = "1";
            let channel: string = "";
            expect(await sseFacade.event(res, id, channel))
        });

        it('should register new subscriber id: "1", channel: "news"', async () => {
            const res = Object.assign({},express.response);
            let id: string = "1";
            let channel: string = "news";
            expect(await sseFacade.event(res, id, channel))
        });

        it('should register new subscriber id: "", channel: "news"', async () => {
            const res = Object.assign({},express.response);
            let id: string = "";
            let channel: string = "news";
            expect(await sseFacade.event(res, id, channel))
        });

        it('should register new subscriber id: "2", channel: ""', async () => {
            const res = Object.assign({},express.response);
            let id: string = "2";
            let channel: string = "";
            expect(await sseFacade.event(res, id, channel))
        });

        it('should register new subscriber id: "2", channel: "news"', async () => {
            const res = Object.assign({},express.response);
            let id: string = "2";
            let channel: string = "news";
            expect(await sseFacade.event(res, id, channel))
        });
    });

    describe('Disconnect Sockets', () => {
        it('should disconnect', async () => {
            expect(await sseFacade.deleteDisconnected())
        });
    });

    describe('Send Messages', () => {

        it('should send id: "1", channel: "", 2 sended', async () => {
            let ids: string [] = ['1'];
            let channels: string[] = [];
            let response = await sseFacade.send(ids, channels);
            expect(2).equal(response.length);
        });

        it('should send id: "1,2", channel: "", 4 sended', async () => {
            let ids: string [] = ['1','2'];
            let channels: string[] = [];
            let response = await sseFacade.send(ids, channels);
            expect(4).equal(response.length);
        });

        it('should send id: "", channel: "news", 3 sended', async () => {
            let ids: string [] = [];
            let channels: string[] = ['news'];
            let response = await sseFacade.send(ids, channels);
            expect(3).equal(response.length);
        });

        it('should send id: "1", channel: "news", 4 sended', async () => {
            let ids: string [] = ['1'];
            let channels: string[] = ['news'];
            let response = await sseFacade.send(ids, channels);
            expect(4).equal(response.length);
        });

        it('should send id: "1,2", channel: "news", 5 sended', async () => {
            let ids: string [] = ['1','2'];
            let channels: string[] = ['news'];
            let response = await sseFacade.send(ids, channels);
            expect(5).equal(response.length);
        });

        it('should send id: "2", channel: "news", 4 sended', async () => {
            let ids: string [] = ['2'];
            let channels: string[] = ['news'];
            let response = await sseFacade.send(ids, channels);
            expect(4).equal(response.length);
        });

        it('should send id: "2", channel: "", 2 sended', async () => {
            let ids: string [] = ['2'];
            let channels: string[] = [];
            let response = await sseFacade.send(ids, channels);
            expect(2).equal(response.length);
        });

        it('should send id: "", channel: "", 0 sended', async () => {
            let ids: string [] = [];
            let channels: string[] = [];
            let response = await sseFacade.send(ids, channels);
            console.log('Response', response);
            expect(0).equal(response.length);
        });
    });
    
});