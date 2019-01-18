const request = require("request");
const http    = require('http')
const Router  = require('router')
const fs      = require('fs');

http.createServer(function(request, response) {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
    return;
  }

  refreshToken().then(function(token) {
    pauseMusic(token)
  })

  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.end('Fatto!')
}).listen(3000)

function refreshToken() {
  return new Promise(function(resolve, reject) {
    const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
    const refresh_request = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'cache-control': 'no-cache',
        Authorization: 'Basic ' + credentials.basic_auth_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: credentials.refresh_token
      }
    };

    request(refresh_request, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).access_token)
        return
      }

      reject(error)
    }) 
  })
}

function pauseMusic(token) {
  const pause_request = {
    method: 'PUT',
    url: 'https://api.spotify.com/v1/me/player/pause',
    headers: {
      'cache-control': 'no-cache',
       Authorization: 'Bearer ' + token
     }
  }

  request(pause_request)
}

