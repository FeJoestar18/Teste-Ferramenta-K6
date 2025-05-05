import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';

export default function () {
  
  const res = http.get('https://homo-app-topdoc.azurewebsites.net/login');
  const doc = parseHTML(res.body);
  const token = doc.find('input[name=_token]').first().attr('value');

  const payload = `email=admin@mail.com&password=Teste@123&_token=${token}`;  

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const loginRes = http.post(
    'https://homo-app-topdoc.azurewebsites.net/login',
    payload,
    headers
  );

  check(loginRes, {
    'status é 200 ou 302': (res) => res.status === 200 || res.status === 302,
  });

  
  if (loginRes.status === 302) {
    check(loginRes, {
      'redirecionamento para a página correta': (res) =>
        res.headers['Location'] === 'https://homo-app-topdoc.azurewebsites.net/home',
    });
  }
}
