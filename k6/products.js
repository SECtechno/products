import http from 'k6/http';
import { sleep } from 'k6';

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const randInt = (a, b) => Math.floor(Math.random() * (b - a)) + a;

let count = 0;

export default function () {
  // http.get('http://test.k6.io');
  // const id = rand(last_ids);
  // const page = randInt(180000, 190000);
  const page = randInt(1, 9000);
  const url = `http://localhost:3000/products?page=${page}`;
  // const url = `http://localhost:3000/products?page=123`;
  // console.log(url);

  http.get(url);
  sleep(.05);
}
