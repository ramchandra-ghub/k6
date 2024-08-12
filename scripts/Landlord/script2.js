import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1,
  iterations:1,
//   duration: '30s',
  thresholds:{
    'group_duration{group:::Admin_launch}': ['max>=0'],
}
};
export default function () {
    let response
  group('Admin_launch', function(){
    response = http.get('http://test.k6.io');
  })
  console.log(response.status)
  sleep(1);
}
