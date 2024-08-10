import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1,
  iterations:1
//   duration: '30s',
};
export default function () {
    let response
  response = http.get('http://test.k6.io');

  console.log(response.status)
  sleep(1);
}
