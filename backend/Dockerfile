FROM python:3.12-slim

WORKDIR /app

# Libs do SO necessárias ao psycopg2-binary
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY app/requirements.txt .
RUN pip install -r requirements.txt

COPY app/ .

# Entrypoint aplica migrações antes de rodar a API
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
