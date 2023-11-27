# MKS Backend Challenge - Emmanuel

## Description
Este é um projeto criado por mim (Emmanuel Rolim Stocco) para o desafio mks-backend-challenge. O desafio consiste em criar uma API RESTful sobre um catálogo de filmes, onde cada endpoint só pode ser consumido com um usuário autenticado e utiliza o Redis como cache, Docker, Nest, Swagger para documentação, PostgreSQL e TypeScript.

## Como startar o projeto

1. **Configurações básicas:**
Para iniciar o projeto corretamente, comece criando um arquivo chamado ".env" na raiz do projeto. Para facilitar, você pode usar o arquivo ".env_example" como guia, pois ele contém todos os padrões necessários para executar o projeto, juntamente com alguns valores predefinidos. Basta inserir as credenciais desejadas no arquivo e prosseguir.

2. **Inicialização com Docker:**
```bash
$ npm run docker
```
ou 
```bash
$ yarn docker
```
Esse comando ira limpar qualquer dado do docker que possa interferir, e subir os 3 conteiners necessários para a aplicação funcionar (um servidor nodejs, um banco postgresql, um banco redis). É fundamental ter um gerenciador de pacotes (npm ou yarn) e o docker instalado. Se preferir, pode subir os servidores docker manualmente através do comando:
```bash
$ docker-compose build --no-cache && docker-compose down && docker-compose up
```

ou 

Você também instalar as dependencias diretamente na sua maquina com os comandos:
```bash
$ npm install
```
ou 
```bash
$ yarn
```
Lembre-se de configurar nesse caso o .env e de subir os servidores dos bancos de dados e da API manualmente, ou parte no docker e parte localmente.

3. **Documentação da API:**
 Acesse: https://localhost:{PORTA_DA_API}/document - Aqui você encontrará a documentação do projeto via Swagger, permitindo testar cada rota da API diretamente no navegador, com dados exigidos, esperados e pré-definidos.

## Desenvolvimento

- **Estudo e Preparação:**
1. Primeiramente eu chequei os requisitos e tecnlogias da API, e organizei um breve estudo sobre as tecnologias que ainda não conhecia

- **Implementação:**
2. Iniciei o projeto instalando as dependências básicas.
3. Instalei e configurei o Docker para executar o PostgreSQL e o Node.js.
4. Utilizei o Nest para criar rotas, controllers e entidades de usuários, já que a regra de negócio exige credenciais para acessar as rotas em filmes.
5. Instalei e inicializei o Swagger e documentei todas as rotas de usuário.
6. Criei um sistema de login JWT usando bcrypt e a biblioteca jwt, através de um middleware.
7. Desenvolvi rotas, controllers e entidades necessárias para o catálogo de filmes, visando cenários reais para criação, deleção, atualização e buscas (por ano de lançamento, diretor, etc.).
8. Adicionei o middleware de autenticação nas controllers para o catálogo de filmes.
9. Documentei com o Swagger todas as rotas, expectativas e obrigatoriedades do sistema de filmes.
10. Instalei o Redis e criei uma instância através do Docker.
11. Utilizei o Redis para melhorar o desempenho nas informações de usuário, realizando validações através de chaves (variáveis ou não) para buscar ou remover do/banco em cache, quando necessário.
12. Apliquei o Redis para melhorar o desempenho nas informações de filmes, realizando validações através de chaves (variáveis ou não) para buscar ou remover do/banco em cache, quando necessário.
13. Reformatei o código conforme necessário com ESLint e simplifiquei o código.
14. Realizei o deploy do banco PostgreSQL, do Redis e da API nos servidores da Render.

## Experiência com cada tecnologia
- TypeScript - 2 anos
- TypeORM - 2 anos
- PostgreSQL - 2 anos 
- Node.js - 2 anos
- Nest.js - 3 semanas
- Docker - 3 semanas
- Swagger - 2 semana
- Redis - Primeiro contato