const request = require('supertest');
const client = require('../db.js');
const express = require('express');

const app = require('../app.js');

describe('/products route', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/products');
    const json = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(json.length).toBe(5);
    expect(json[0].id).toEqual(79141);
    expect(json[0].name).toEqual('Carlie Hat');
    expect(json[0].slogan).toEqual('Tempore voluptatem placeat sint consequatur quasi qui natus.');
    expect(json[0].description).toEqual("Aut sunt inventore voluptas sunt mollitia dignissimos. Officiis doloremque eum possimus. Perferendis repudiandae earum molestiae molestias sed praesentium dolore.");
    expect(json[0].category).toEqual("Hat");
    expect(json[0].default_price).toEqual("709");
  });
});

afterAll(() => {
  client.end();
});
