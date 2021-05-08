const request = require('supertest');
const client = require('../db.js');
const express = require('express');

const app = require('../app.js');

describe('styles route', () => {
  it('should return a list of styles for a product', async () => {
    const res = await request(app).get('/products/12345/styles');
    const json = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(json.product_id).toBe('12345');
    expect(JSON.stringify(json.results[0])).toEqual(`{"style_id":24352,"name":"Purple","original_price":"199","sale_price":null,"default?":true,"photos":[{"url":"https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80","thumbnail_url":"https://images.unsplash.com/11/converse-fields.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"},{"url":"https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80","thumbnail_url":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"},{"url":"https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80","thumbnail_url":"https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"}],"skus":{"138692":{"quantity":34,"size":"XS"},"138693":{"quantity":13,"size":"S"},"138694":{"quantity":6,"size":"M"},"138695":{"quantity":46,"size":"L"},"138696":{"quantity":40,"size":"XL"},"138697":{"quantity":36,"size":"XXL"}}}`);
  });
});

afterAll(() => {
  client.end();
});
