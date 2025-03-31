<h1 align="center" style="font-weight: bold">kinvo-challenge 💸</h1>

## Descrição 📜

Esse projeto consiste em um sistema que tem como objetivo a criação de um produto financeiro - que gere rendimentos com o tempo e tem diversas aplicações/resgates. Esse produto é comumente conhecido como cdb e/ou caixinha.

[link para o desafio técnico](https://github.com/kinvoapp/kinvo-back-end-test)

## Tecnologias 🖥️

Este projeto está utilizando as seguintes tecnologias:

- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)

## Endpoints 📌

A seguir estão as rotas da aplicação:

### Usuário

- **GET** `/users/:id`: lista um usuário buscando pelo id.
- **GET** `/users/email?email=`: lista um usuário buscando pelo email (query string).
- **POST** `/users`: cria um novo usuário.
- **PATCH** `/users/:id/money`: deposita dinheiro na conta de um determinado usuário.
- **POST** `/auth/signin`: faz o login.

### Caixinha (cdb)

- **GET** `/cdbs/:id`: lista uma caixinha (CDB) buscando pelo id.
- **POST** `/cdbs`: cria uma nova caixinha (CDB).
- **PATCH** `/cdbs/:id`: atualiza o nome da caixinha (CDB).

### Aplicações

- **GET** `/applications/cdb/:cdb_id`: lista todas aplicações de uma determinada caixinha (CDB).
- **GET** `/applications/:id`: lista uma aplicação buscando pelo id.
- **POST** `/applications`: cria uma nova aplicação.

### Resgates

- **GET** `/redemptions/cdb/:cdb_id`: lista todos os resgates de uma determinada caixinha (CDB).
- **GET** `/redemptions/:id`: lista um resgate buscando pelo id.
- **POST** `/redemptions`: cria um novo resgate.

## Como rodar esse projeto? 💿

<h3>Pre-requisitos</h3>

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Github](https://github.com/)

<h3>Clonagem</h3>

```bash
# clone o repositório
$ git clone https://github.com/bastosmatheus/backend-challenges/kinvo-challenge.git
```

<h3>Configuração do arquivo .env</h3>

```bash
# arquivo .env
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=
```

<h3>Projeto</h3>

```bash
# depois de clonado, procure a pasta do projeto
$ cd kinvo-challenge

# execute o docker
$ docker-compose up
```
