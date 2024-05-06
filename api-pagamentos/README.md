# Api para pagamentos

Esse projeto tem como objetivo fornecer meios de pagamentos para clientes. Nele, os compradores conseguem pagar de 2 formas: pix ou cartão. A API foi baseada em um desafio técnico (https://github.com/wirecardBrasil/challenge/tree/master/backend).

A criação da API é feita com o EXPRESS, utilizando a biblioteca POSTGRES.JS para efetuar as queries no banco de dados (PostgresSQL). Pensando na consistência dos dados, é utilizado a biblioteca ZOD, para efetuar uma validação do schema/tipo das informações que foram passadas pelo usuário.

Nesse projeto foi implementado o padrão EITHER (estrutura de dados que representa dois tipos diferentes, Success e Failure), facilitando a manipulação e tratativa dos erros da aplicação.

Para finalizar, são feito alguns testes unitários com o Vitest.

<h2>Tópicos 📍</h2>

- <a href="#techs">Tecnologias utilizadas</a>
- <a href="#project">Como rodar esse projeto?</a>
- <a href="#api">Principais endpoints da API</a>

<h2 id="techs">Tecnologias Utilizadas 🖥️</h2>

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://www.expressjs.com/pt-br/)
- [Zod](https://zod.dev/)
- [Postgres.js](https://github.com/porsager/postgres)
- [Vitest](https://vitest.dev/)

<h2 id="project">Como rodar esse projeto? 💿</h2>

<h3>Pre-requisitos</h3>

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Github](https://github.com/)

<h3>Clonagem</h3>

```bash
# clone o repositório
$ git clone https://github.com/backend-challenges
```

<h3>Configuração do arquivo .env</h3>

```bash
# arquivo .env
DATABASE_URL="postgresql://username:password@localhost:5432/yourdatabase?schema=public"
```

<h3>Projeto</h3>

```bash
# depois de clonado, procure a pasta do projeto
$ cd api-pagamentos

# instale todas as dependências
$ npm install

# execute o projeto
$ npm run start
```

<h2 id="api">Principais endpoints da API 🗺️</h2>

A seguir estão as rotas da aplicação:

### Comprador

- **GET** `/buyers`: lista todos os compradores (usuários).
- **POST** `/buyers`: cria um novo comprador (usuário).
- **DELETE** `/buyers/:id`: deleta um comprador (usuário).

### Informação de pagamento

- **GET** `/paymentsinfos`: lista todas as informações dos pagamentos da aplicação.
- **GET** `/paymentsinfos/pixs`: lista todas as informações dos pagamentos que foram pagos com pix.
- **GET** `/paymentsinfos/cards`: lista todas as informações dos pagamentos que foram pagos com cartão.
- **GET** `/paymentsinfos/status/:id_status`: lista todas as informações dos pagamentos que correspondem ao id status informado.
- **POST** `/paymentsinfos`: cria uma nova informação de um pagamento.
- **DELETE** `/paymentsinfos/:id`: deleta uma informação de pagamento.

### Status de pagamento

- **GET** `/paymentstatus`: lista todos os status de pagamento registrados (pago, cancelado, aguardando pagamento, etc..).
- **GET** `/paymentstatus/:id`: lista um status de pagamento que corresponde ao id informado.
- **POST** `/paymentstatus`: cria um novo status de pagamento.

### Cartão

- **GET** `/cards`: lista todos os cartões registrados.
- **GET** `/cards/:id`: lista um cartão que corresponde ao id informado.
- **GET** `"/cards/buyer/:id_buyer"`: lista todos os cartões cadastrados pelo comprador que corresponde ao id buyer.
- **POST** `/cards`: cria um novo cartão.
- **DELETE** `/cards/:id`: deleta um cartão.

### Pix

- **GET** `/pixs`: lista todos os pixs criados.
- **GET** `/pixs/:id`: lista um pix que corresponde ao id informado.
- **GET** `"/pixs/buyer/:id_buyer"`: lista todos os pixs criados para o comprador que corresponde ao id buyer.
- **POST** `/pixs`: cria um novo pix.
