'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server/server');

describe('PUT /api/product/10112671', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('data not found', async () => {
        const res = await server.inject({
            method: 'put',
            url: '/api/product/10112671',
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

describe('PUT /api/product/1', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('Duplicate Response', async () => {
        const res = await server.inject({
            method: 'put',
            url: '/api/product/1',
            payload: {
                sku: '24751497',
                name: 'Sample Product',
                price: '1000',
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus facilis blanditiis obcaecati reprehenderit, facere libero dolor sapiente quisquam modi magnam ab iusto odio ullam doloribus. Minima aliquid delectus iure modi.'
            }
        });
        expect(res.statusCode).to.equal(400);
    });
});

describe('PUT /api/product/1', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('Payload Error', async () => {
        const res = await server.inject({
            method: 'put',
            url: '/api/product/1',
            payload: {
                name: 'Sample Product',
                price: '1000',
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus facilis blanditiis obcaecati reprehenderit, facere libero dolor sapiente quisquam modi magnam ab iusto odio ullam doloribus. Minima aliquid delectus iure modi.'
            }
        });
        expect(res.statusCode).to.equal(400);
    });
});