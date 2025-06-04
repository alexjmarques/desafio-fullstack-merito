# 📦 Desafio Fullstack Mérito

O projeto fullstack é composto por um frontend moderno com React e um backend robusto usando Python com Flask, organizado com Docker para facilitar execução, apenas com um comando.

---

## 🚀 Stacks Utilizadas

### Backend
- **Linguagem:** Python 3.12+
- **Framework:** Flask
- **ORM:** SQLAlchemy
- **Migração de banco:** Flask-Migrate
- **Serialização:** Marshmallow
- **Banco de dados:** PostgreSQL
- **Documentação:** Swagger (via Flasgger)
- **Testes:** Pytest
- **Gerenciamento de CORS:** Flask-CORS

### Frontend
- **Linguagem:** TypeScript
- **Framework:** Next.js (React)
- **Bibliotecas:**
  - Axios
  - Tailwind CSS (estilização)
  - Headless UI (componentes de acessibilidade)
  - Formik (formulários)

### DevOps
- **Ambiente de desenvolvimento:** Docker + Docker Compose

---

## 🛠️ Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose instalados.

### Passos

```bash
# Clone o repositório
git clone https://github.com/alexjmarques/desafio-fullstack-merito.git
cd desafio-fullstack-merito

# Copie os dois arquivo de variáveis de ambiente
cp .env.example .env
cp frontend/app/.env.example frontend/app/.env

# Suba os containers
docker-compose up --build -d
```

Na primeira execução o front Next.js demora um pouco para subir, mas uma vez subido os proximos builds são mais rápidos.
Após subir o projeto, as interfaces estarão disponíveis em:

- **Frontend:** `http://localhost:3000`
- **Backend (API):** `http://localhost:8000/docs/`

---

## 📘 Como testar o backend

A API conta com documentação via **Swagger** acessível em:

```url
http://localhost:8000/docs/
```

Nessa documentação estão listados todos os endpoints disponíveis de forma simples, apenas para fins de documentação e consulta rápida.

Caso prefira testar via **Postman**, basta importar os endpoints disponivel atraves do arquivo disponivel na raiz do projeto:

- postman_collection.json
