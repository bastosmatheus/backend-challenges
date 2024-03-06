# Api de eventos

Uma api que tem como objetivo possibilitar a criação de eventos, tudo isso feito por usuários. Além disso os eventos são visiveis para todos, com o intuito de permitir inscrições, para que os usuários se reunam e curtam o evento.

<h2>Tópicos 📍</h2>

- <a href="#techs">Tecnologias utilizadas</a>
- <a href="#project">Como rodar esse projeto?</a>

<h2 id="techs">Tecnologias Utilizadas 🖥️</h2>

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://www.expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

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

JWT_PASS={JWT_PASS}
```

<h3>Projeto</h3>

```bash
# depois de clonado, procure a pasta do projeto
cd api-events

# instale todas as dependências
npm install

# execute o projeto
npm run dev
```

<h2 id="api">Principais endpoints da API</h2>

| ROUTE                        | DESCRIPTION                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <kbd>POST /users</kbd>       | cria um usuário, veja mais na [resposta da requisição](#post-users)                                         |
| <kbd>POST /users/login</kbd> | autentica um usuário na API, veja [detalhes da requisição](#post-users-login)                                     |
| <kbd>POST /events</kbd>      | cria um evento, veja mais na [resposta da requisição](#post-events)                                         |
| <kbd>GET /events</kbd>       | informa todos os eventos na API, veja [detalhes da requisição](#get-events)                                 |
| <kbd>POST /events-registrations</kbd>      | registra uma inscrição de um usuário a um evento, veja [resposta da requisição](#post-events-registrations) |
| <kbd>GET /events-registrations</kbd>       | retorna todos os registros de eventos na API, veja [detalhes da requisição](#get-events-registrations)                   |

<h3 id="#post-users">POST /users</h3>

**REQUISIÇÃO**

```json
{
  "name": "Matheus",
  "email": "matheus@gmail.com",
  "password": "senha-matheus"
}
```

**RESPOSTA**

```json
{
  "message": "Usuário criado com sucesso",
  "type": "Created",
  "statusCode": 201,
  "userCreated": {
    "id": 1,
    "username": "Matheus",
    "email": "matheus@gmail.com",
    "password": "$2b$10$ZFWm3vysevunotd29hCQ4.NOZoH2bYMCorIfaLU.AGhiAtVLtx2d6"
  }
}
```

<h3 id="#post-users-login">POST /users/login</h3>

**REQUISIÇÃO**

```json
{
  "email": "matheus@gmail.com",
  "password": "senha-matheus"
}
```

**RESPOSTA**

```json
{
  "message": "Usuário logado",
  "type": "OK",
  "statusCode": 200,
  "userLogged": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXaisdjaiSAaodjh1298aIODASK18923moasW"
  }
}
```

<h3 id="#post-events">POST /events</h3>

**REQUISIÇÃO**

```json
{
  "event_name": "Criar uma api de eventos, com possibilidade de inscrição dos usuários",
  "event_date": "2024-04-15T14:26:16.544Z",
  "event_time": "2024-03-05T14:26:16.544Z",
  "registration_end_date": "2024-03-10T14:26:16.544Z",
  "limit_participants": 10,
  "user_id": 1
}
```

**RESPOSTA**

```json
{
  "message": "Evento criado com sucesso",
  "type": "OK",
  "statusCode": 200,
  "eventCreated": {
    "id": 1,
    "event_name": "Criar uma api de eventos, com possibilidade de inscrição dos usuários",
    "event_date": "2024-03-15T00:00:00.000Z",
    "event_time": "14:26:16.544Z",
    "registration_start_date": "2024-03-06T00:00:00.000Z",
    "registration_end_date": "2024-03-10T00:00:00.000Z",
    "limit_participants": 10,
    "additional_infos": "",
    "updated_at": "2024-03-06T20:35:55.947Z",
    "user_id": 1
  }
}
```

<h3 id="#get-events">GET /events</h3>

**RESPOSTA**

```json
{
  "type": "OK",
  "statusCode": 200,
  "events": [
    {
      "id": 1,
      "event_name": "Criar uma api de eventos, com possibilidade de inscrição dos usuários",
      "event_date": "2024-03-15T00:00:00.000Z",
      "event_time": "14:30:00.000Z",
      "registration_start_date": "2024-03-06T00:00:00.000Z",
      "registration_end_date": "2024-03-10T00:00:00.000Z",
      "limit_participants": 10,
      "additional_infos": "",
      "updated_at": "2024-03-05T20:35:55.947Z",
      "user_id": 1
    },
    {
      "id": 2,
      "event_name": "Fazer um README bonito para esse projeto",
      "event_date": "2024-03-10T00:00:00.000Z",
      "event_time": "15:30:00.000Z",
      "registration_start_date": "2024-03-06T00:00:00.000Z",
      "registration_end_date": "2024-03-08T00:00:00.000Z",
      "limit_participants": 1,
      "additional_infos": "",
      "updated_at": "2024-03-05T22:49:16.898Z",
      "user_id": 1
    }
  ]
}
```

<h3 id="#post-events-registrations">POST /events-registrations</h3>

**REQUISIÇÃO**

```json
{
  "event_id": 1,
  "user_id": 1
}
```

**RESPOSTA**

```json
{
  "message": "Inscrição no evento feita com sucesso",
  "type": "OK",
  "statusCode": 200,
  "eventRegistrationCreated": {
    "id": 1,
    "registration_date": "2024-03-06T20:48:51.469Z",
    "user_id": 1,
    "event_id": 2
  }
}
```

<h3 id="#get-events-registrations">GET /events-registrations</h3>

**RESPOSTA**

```json
{
  "type": "OK",
  "statusCode": 200,
  "eventsRegistrations": [
    {
      "id": 1,
      "registration_date": "2024-03-05T22:49:22.449Z",
      "user_id": 1,
      "event_id": 1
    },
    {
      "id": 2,
      "registration_date": "2024-03-06T20:48:51.469Z",
      "user_id": 1,
      "event_id": 2
    }
  ]
}
```
