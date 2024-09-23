# Teste Prático

## REQUSITOS FUNCIONAIS

[X] - Deve ser possível cadastrar um usuário.
[X] - Deve ser possível atualizar um usuário.
[X] - Deve ser possível listar os usuários.
[X] - Deve ser possível deletar o usuário.
[X] - Deve ser possível autenticar um usuário.

## REGRAS DE NEGÓCIO

[X] - Não deve ser possível cadastrar mais de um usuário com o mesmo e-mail.
[X] - Não deve ser possível atualizar um usuário com o mesmo e-mail associado a outra conta.
[X] - Não deve ser possível visualizar a senha dos usuários durante a listagem.

## REQUISITOS NÃO FUNCIONAIS

[X] - A senha do usuário deve ser criptografada antes de ser salva no banco de dados.
[X] - O retorno da listagem de usuários deverá conter páginas com o retorno de 20 dados por página.

# CRUD NEST API

<img width="280" src="https://samory.sistemasresponsivos.com.br/wp-content/uploads/2022/04/1200px-Node.js_logo.svg_.png" />

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Utilizada](#stack-utilizada)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)

## Sobre o Projeto

O projeto é basicamente um back-end construído em Node.js que implementa um CRUD.

## Stack Utilizada

**Back-end:** 
- [Node.js](https://nodejs.org/)

## Funcionalidades

- Criar usuários
- Listar usuários
- Atualizar usuários
- Deletar usuários
- Autenticar usuários


## Documentação da API

#### Validação dos campos
 - **Name**
   - Não pode conter números.

- **Email**
   - Não pode conter um formato inválido.

- **Password**
   - Deve conter pelo menos uma letra maiúscula.
   - Deve conter pelo menos uma letra minúscula.
   - Deve conter pelo menos um número.
   - Deve conter pelo menos um caractere especial.
   - Deve ter no mínimo 8 caracteres.

#

#### Criação de usuário

```http
  POST /user
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do usuário (**Obrigatório**)|
| `email` | `string` | E-mail do usuário (**Obrigatório**)|
| `password` | `string` | Senha do usuário (**Obrigatório**)|


#### Listagem de usuários
```http
  GET /user
```

| Query Params   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `number` | exemple: 1 (**Obrigatório**)|


#### Atualização de usuário
```http
  PUT /user
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | Nome do usuário (**Obrigatório**)|
| `name` | `string` | Nome do usuário (**Opcional**)|
| `email` | `string` | E-mail do usuário (**Opcional**)|
| `password` | `string` | Senha do usuário (**Opcional**)|

**Informação**: As informações enviadas no corpo da requisição devem incluir pelo menos um dado; caso contrário, será retornado um erro.

#### Listagem de usuários
```http
  DELETE /user
```

| Params   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID do usuário (**Obrigatório**)|



## Pré-requisitos

Para começar a trabalhar no projeto, certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- **Node.js:** O projeto depende do Node.js para execução de scripts. Se você não tiver o Node.js instalado, poderá baixá-lo em [https://nodejs.org/](https://nodejs.org/).
- **Docker:** Para utilizar o projeto uma alternativa é a utilização do docker, poderá baixá-lo em [https://www.docker.com/](https://www.docker.com/).

## Instalação

Siga estas etapas para colocar o projeto em funcionamento:

1. Clone o repositório
```sh
git clone https://github.com/CarlosDanielss/nest-crud-api.git
```
2. Navegue até o diretório do projeto
```sh
cd crud-nest
```
3. Adicionar as variaveis ambiente

4. Inicie o servidor (tanto o banco de dados quanto o App node)
```sh
docker compose up -d
```

