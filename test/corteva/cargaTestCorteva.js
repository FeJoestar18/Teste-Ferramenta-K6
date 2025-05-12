import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 50 }, 
    { duration: "1m", target: 100 }, 
    { duration: "30s", target: 0 },  
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"], 
  },
};

const BASE_URL = "https://homo-bkp.programalidera.com.br";
export default function () {
    
  const res = http.get(`${BASE_URL}/home`);

  check(res, {
    "Página carregada com sucesso": (r) => r.status === 200,
  });

  sleep(1);
}
