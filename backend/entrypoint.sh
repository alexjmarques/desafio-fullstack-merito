#!/usr/bin/env sh
set -e

if [ ! -d "/app/migrations" ]; then
  echo "» Inicializando migrations …"
  flask db init         --directory /app/migrations
  flask db migrate -m "initial"
fi


echo "» Aplicando upgrade …"
flask db upgrade        --directory /app/migrations


echo "» Iniciando Gunicorn …"
exec gunicorn -b 0.0.0.0:8000 "app:create_app()"
