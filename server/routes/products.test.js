const request = require('supertest');
const client = require('../db.js');
const express = require('express');

const app = require('../app.js');

describe('/products route', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/products?count=5&page=1');
    const json = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(json.length).toBe(5);
    expect(json[4].id).toEqual(5);
    expect(json[4].name).toEqual("Heir Force Ones");
    expect(json[4].slogan).toEqual('A sneaker dynasty');
    expect(json[4].description).toEqual("Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl");
    expect(json[4].category).toEqual('Kicks');
    expect(json[4].default_price).toEqual('99');
  });
});

afterAll(() => {
  client.end();
});