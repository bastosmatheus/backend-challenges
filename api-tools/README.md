# Api de eventos

Uma api que tem como objetivo gerenciamento (criação, leitura, atualização e exclusão) de ferramentas com campos de nome, links, descrições e tags relacionadas a essa ferramenta. A criação dessa api é baseada num desafio tecnico (https://bossabox.notion.site/Back-end-0b2c45f1a00e4a849eefe3b1d57f23c6).

<h2>Tópicos 📍</h2>

- <a href="#techs">Tecnologias utilizadas</a>
- <a href="#project">Como rodar esse projeto?</a>
- <a href="#api">Principais endpoints da API</a>

<h2 id="techs">Tecnologias Utilizadas 🖥️</h2>

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://www.expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

<h2 id="project">Como rodar esse projeto? 💿</h2>

<h3>Pre-requisitos</h3>

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Github](https://github.com/)

<h3>Clonagem</h3>

```bash
# clone o repositório
$ git clone https://github.com/bastosmatheus/backend-challenges
```

<h3>Configuração do arquivo .env</h3>

```bash
# arquivo .env
DATABASE_URL="postgresql://username:password@localhost:5432/yourdatabase?schema=public"
```

<h3>Projeto</h3>

```bash
# depois de clonado, procure a pasta do projeto
cd api-tools

# instale todas as dependências
npm install

# execute o projeto
npm run dev
```

<h2 id="api">Principais endpoints da API 🗺️</h2>

| ROUTE                         | DESCRIPTION                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>POST /tools</kbd>        | cria uma ferramenta na API, veja [detalhes da requisição](#post-tools)                                                           |
| <kbd>GET /tools</kbd>         | retorna todas ferramentas já registradas, veja mais na [resposta da requisição](#get-tools)                                      |
| <kbd>GET /tools?tag=</kbd>    | retorna todas ferramentas que contenham uma tag correspondente a da query, veja mais na [resposta da requisição](#get-tools-tag) |
| <kbd>DELETE /tools/{id}</kbd> | deleta uma ferramenta, veja [detalhes da requisição](#get-events)                                                                |

<h3 id="#post-tools">POST /tools</h3>

**REQUISIÇÃO**

```json
{
  "title": "Aprendendo prisma + postgreSQL",
  "link": "https://www.prisma.io/",
  "description": "Primeira vez mexendo com prisma + postgreSQL, aprendendo sobre migrations/cli do prisma",
  "tags": ["prisma", "postgreSQL"]
}
```

**RESPOSTA**

```json
{
  "message": "Ferramenta criada com sucesso",
  "type": "OK",
  "statusCode": 201,
  "toolCreated": {
    "id": 1,
    "title": "Aprendendo prisma + postgreSQL",
    "link": "https://www.prisma.io/",
    "description": "Primeira vez mexendo com prisma + postgreSQL, aprendendo sobre migrations/cli do prisma",
    "tags": ["prisma", "postgreSQL"]
  }
}
```

<h3 id="#get-tools">GET /tools</h3>

**RESPOSTA**

```json
{
  "type": "OK",
  "statusCode": 200,
  "tools": [
    {
      "id": 1,
      "title": "Aprendendo prisma + postgreSQL",
      "link": "https://www.prisma.io/",
      "description": "Primeira vez mexendo com prisma + postgreSQL, aprendendo sobre migrations/cli do prisma",
      "tags": ["prisma", "postgreSQL"]
    },
    {
      "id": 2,
      "title": "Aprendendo postgreSQL + prisma",
      "link": "https://www.postgresql.org/",
      "description": "Primeira vez mexendo com postgreSQL + prisma, aprendendo sobre o banco de dados postgreSQL",
      "tags": ["prisma", "postgreSQL"]
    }
  ]
}
```

<h3 id="#get-tools-tags">GET /tools?tag=</h3>

**RESPOSTA**

```json
{
  "type": "OK",
  "statusCode": 200,
  "toolsWithTag": [
    {
      "id": 1,
      "title": "Aprendendo prisma + postgreSQL",
      "link": "https://www.prisma.io/",
      "description": "Primeira vez mexendo com prisma + postgreSQL, aprendendo sobre migrations/cli do prisma",
      "tags": ["prisma", "postgreSQL"]
    },
    {
      "id": 2,
      "title": "Aprendendo postgreSQL + prisma",
      "link": "https://www.postgresql.org/",
      "description": "Primeira vez mexendo com postgreSQL + prisma, aprendendo sobre o banco de dados postgreSQL",
      "tags": ["prisma", "postgreSQL"]
    }
  ]
}
```

<h3 id="#delete-tools">DELETE /tools/{id}</h3>

**RESPOSTA**

```json
{
  "message": "Ferramenta deletada com sucesso",
  "type": "OK",
  "statusCode": 200,
  "toolDeleted": {
    "id": 1,
    "title": "Aprendendo prisma + postgreSQL",
    "link": "https://www.prisma.io/",
    "description": "Primeira vez mexendo com prisma + postgreSQL, aprendendo sobre migrations/cli do prisma",
    "tags": ["prisma", "postgreSQL"]
  }
}
```
