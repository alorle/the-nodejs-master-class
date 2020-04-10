# HTTPS Cert and Key folder

In order to create `cert.pem` and `key.pem` for HTTPS server, run inside this folder the following command:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```