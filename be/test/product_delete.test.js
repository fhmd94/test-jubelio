'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server/server');

describe('DELETE /api/product/6', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('response 201', async () => {
        const res = await server.inject({
            method: 'delete',
            url: '/api/product/6'
        });
        expect(res.statusCode).to.equal(201);
    });
});

describe('DELETE /api/product/10112671', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('Not Found Response', async () => {
        const res = await server.inject({
            method: 'delete',
            url: '/api/product/10112671'
        });
        expect(res.statusCode).to.equal(400);
    });
});
