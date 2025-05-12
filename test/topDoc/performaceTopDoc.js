// k6 Load Test Script
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 50, 
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
};

export default function () {
    const url = 'https://homo-app-topdoc.azurewebsites.net';
    const response = http.get(url);

    check(response, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta menor que 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}
