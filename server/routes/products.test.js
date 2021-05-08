const request = require('supertest');
const express = require('express');

const app = require('../index.js');

describe('Sample Test', () => {
  it('should be a test', () => {
    request(app)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(true).toBe(true);
      });
    done();
  });
});
