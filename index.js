const request = require("request");
const http    = require('http')
const Router  = require('router')
const fs      = require('fs');

http.createServer(function(req, res) {

  launchPauseMusic()

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Done!')

}).listen(3000)

function launchPauseMusic() {
  refreshToken((error, response, body) => {
    if (error) throw new Error(error);
    const token = JSON.parse(body).access_token
    pauseMusic(token)
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

function refreshToken(callback) {
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

  request(refresh_request, callback);
}

