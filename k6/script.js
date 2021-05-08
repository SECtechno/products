import http from 'k6/http';
import { sleep } from 'k6';

const last_ids = [1000011, 1000010, 1000009, 1000008, 1000007, 1000006, 1000005, 1000004, 1000003,
   1000002, 1000001, 1000000, 999999, 999998, 999997, 999996, 999995, 999994, 999993, 999992];

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

export default function () {
  // http.get('http://test.k6.io');
  const url = `http://localhost:3000/products/${rand(last_ids)}`;
  http.get(url);
  sleep(1);
}
