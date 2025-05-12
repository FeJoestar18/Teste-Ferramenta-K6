import http from "k6/http";
import { check, sleep } from "k6";

// Configurações do teste
export const options = {
  stages: [
    { duration: "10s", target: 10 },  
    { duration: "20s", target: 10 },  
    { duration: "10s", target: 0 },  
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = "https://homo-app-topdoc.azurewebsites.net";

export default function () {

  const res = http.get(`${BASE_URL}/home`);

  check(res, {
    "Página carregada com sucesso": (r) => r.status === 200,
  });

  sleep(1);
}
