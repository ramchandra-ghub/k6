import http from 'k6/http';
import { check, group, fail, sleep } from 'k6';
export const options = {
  vus: 1,
  iterations:1,
//   duration: '30s',
  thresholds:{
    'group_duration{group:::LL_Launch}': ['max>=0'],
}
};
export default function () {
    let response
  group('LL_Launch', function(){
    response = http.get('http://test.k6.io');
  })
  console.log(response.status)
  sleep(1);
}

export function handleSummary(data) {
  let csvContent = `Group, 90 Percentile(ms) \n`
  for(let metricName in data.metrics){
    if(metricName.startsWith('group_duration{group:::')){
      let groupName = metricName.match(/group:::(.+?)}/)
      let percentile90 = data.metrics[metricName].values['p(90)']
      csvContent += `${groupName[1]},${percentile90}\n`
    }
  }
  return {
    'csvContent.csv': csvContent,
    textSummary(data, { indent: '->', enableColors:true })
  }

}
