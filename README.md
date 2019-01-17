## Spotify Pause

Configure it

```bash
$ cp credentials.json.example credentials.json
```

changing credentials.json content with required tokens.

___

Build it

```bash
$ docker build -t spotify-pause .
```

and run it

```bash
$ docker run --rm -dp 3000:3000 spotify-pause
```

Pause music calling http://localhost:3000 with any http verb.
