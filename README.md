# 📦 Desafio Fullstack Mérito

Este projeto fullstack foi desenvolvido com foco em desempenho, organização e facilidade de execução. Conta com um frontend moderno em **Next.js (React)** e um backend robusto em **Python (Flask)**, orquestrados por **Docker**, permitindo que toda a aplicação seja iniciada com apenas um comando.

Ao executar o projeto via Docker, toda a estrutura é automaticamente configurada:

- Backend: Python + Flask
- Banco de Dados: PostgreSQL
- Frontend: Next.js com TypeScript

No backend, segui as diretrizes propostas no desafio, priorizando um código limpo, funcional e bem organizado. Implementei a documentação da API utilizando **Swagger**, acessível via browser para facilitar a consulta das rotas. Também incluí um **entrypoint** que executa uma seed inicial com dados de fundos cadastrados automaticamente ao iniciar o container.

No frontend, utilizei o framework **Next.js** para otimizar a performance e garantir uma experiência mais fluida na interface. A aplicação conta com bibliotecas modernas para gerenciamento de formulários, estilização e requisições assíncronas.

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
