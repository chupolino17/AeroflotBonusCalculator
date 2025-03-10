before build you need to prepare your secrets into
```
mkdir secrets
touch secrets/client_secret.txt // secret for aeroflot client X-IBM-Client-Id token
touch secrets/django_secret.txt // secret for SECRET_KEY of django settings.py
```
to build run:
```
docker compose build
docker compose up
```
