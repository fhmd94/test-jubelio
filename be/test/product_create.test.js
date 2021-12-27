'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server/server');

describe('POST /api/product', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 201', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/api/product',
            payload: {
                sku: '10112671',
                name: 'Sample Product',
                price: '1000',
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus facilis blanditiis obcaecati reprehenderit, facere libero dolor sapiente quisquam modi magnam ab iusto odio ullam doloribus. Minima aliquid delectus iure modi.'
            }
        });
        expect(res.statusCode).to.equal(201);
    });
});

describe('POST /api/product', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('Duplicate Response', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/api/product',
            payload: {
                sku: '10112671',
                name: 'Sample Product',
                price: '1000',
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus facilis blanditiis obcaecati reprehenderit, facere libero dolor sapiente quisquam modi magnam ab iusto odio ullam doloribus. Minima aliquid delectus iure modi.'
            }
        });
        expect(res.statusCode).to.equal(400);
    });
});

describe('POST /api/product', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('Payload Error', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/api/product',
            payload: {
                name: 'Sample Product',
                price: '1000',
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus facilis blanditiis obcaecati reprehenderit, facere libero dolor sapiente quisquam modi magnam ab iusto odio ullam doloribus. Minima aliquid delectus iure modi.'
            }
        });
        expect(res.statusCode).to.equal(400);
    });
});