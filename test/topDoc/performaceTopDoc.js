// k6 Load Test Script
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 50, // Número de usuários virtuais simultâneos
    duration: '30s', // Duração total do teste
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% das requisições devem ser menores que 500ms
    },
};

export default function () {
    const url = 'https://homo-app-topdoc.azurewebsites.net/';
    const response = http.get(url);

    // Verificações de status
    check(response, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta menor que 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}
