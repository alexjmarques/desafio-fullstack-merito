#!/usr/bin/env sh
set -e

echo "» DATABASE_URL: $DATABASE_URL"


if [ ! -d "/app/migrations/versions" ]; then
  echo "» Nenhuma versão detectada — gerando migrations …"
  flask db init --directory /app/migrations || echo "migrations já inicializado"
fi

echo "» Gerando novas migrações (se houver alterações nos modelos) …"
flask db migrate -m "autogenerate migrations" || echo "nenhuma mudança detectada"

echo "» Aplicando upgrade no banco …"
flask db upgrade --directory /app/migrations

echo "» Inserindo dados iniciais …"
python -c "from app import create_app; app = create_app(); from app.extensions import db; app.app_context().push(); from app.seed import seed_data; seed_data()"

echo "» Iniciando Gunicorn …"
exec gunicorn -b 0.0.0.0:8000 "app:create_app()"
