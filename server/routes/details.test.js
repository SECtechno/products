const request = require('supertest');
const client = require('../db.js');
const express = require('express');

const app = require('../app.js');

describe('product details route', () => {
  it('should return details about a product', async () => {
    const res = await request(app).get('/products/12345');
    const json = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(`{"id":12345,"name":"Genesis Suit","slogan":"Fuga fuga soluta nobis numquam dolorem sit.","description":"Ipsum similique vel rerum aperiam ab vitae accusantium quas id. Voluptas et aspernatur esse tempora voluptatem est. Temporibus cupiditate ut aut voluptatem quidem.","category":"Suit","default_price":"199","features":[{"feature":"5 Year Warranty","value":"null"},{"feature":"Frame","value":"DuraResin"}],"test":"TEST"}`);
  });
});

afterAll(() => {
  client.end();
});
