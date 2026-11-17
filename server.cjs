const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
http.createServer((req, res) => {
  const name = new URL(req.url, 'http://localhost').pathname;
  const files = {'/':'index.html','/index.html':'index.html','/style.css':'style.css','/game.js':'game.js'};
  if (!files[name]) { res.writeHead(404); res.end('Not found'); return; }
  const type = name.endsWith('.css') ? 'text/css' : name.endsWith('.js') ? 'text/javascript' : 'text/html';
  res.writeHead(200, {'Content-Type': type+'; charset=utf-8'});
  fs.createReadStream(path.join(__dirname,files[name])).pipe(res);
}).listen(8080,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8080'));
