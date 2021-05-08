const request = require('supertest');
const client = require('../db.js');
const express = require('express');

const app = require('../app.js');

describe('/related route', () => {
  it('should return a list of related products', async () => {
    const res = await request(app).get('/products/12345/related');
    const json = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(json).toEqual([6836,7434,4947,354]);
  });
});

afterAll(() => {
  client.end();
});
