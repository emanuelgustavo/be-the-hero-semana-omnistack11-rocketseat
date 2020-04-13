# 11ª Semana Omnistack Rocketseat
Semana focada em desenvolver um aplicação Web, do back ao front-end e com mobile utilizando a stack JavaScrip.

------------


## Stack Utilizada

### Front-End

 - [React](https://pt-br.reactjs.org/ "React")
Uma biblioteca interativa para criar interfaces com o usuário.

### Mobile

- [React Native](https://reactnative.dev/)
Com o lema: "Learn once, write anywhere", utiliza os mesmos conceitos do React para criar interfaces nativas para dispositivos móveis. Com um código e uma linguagem é possível criar apps para Android e iOS.

- [Expo](https://expo.io/)
É um framework e uma plataforma universal para aplicação React, definindo ferramentas construídas em React Native e plataformas nativas que ajudam o desenvolvedor a construír, lançar e interagir rapidamente no iOS e Android a partir do mesmo código JavaScript/TypeScript. 

### Back-End

- [NodeJs](https://nodejs.org/pt-br/)
Node.js® é um runtime JavaScript desenvolvido com o Chrome's V8 JavaScript engine. Basicamente.

- [SQLite](https://www.sqlite.org/index.html)
Este é o nosso banco de dados. Do tipo SQL, onde a estrutura é bem definida. 


------------



## O que construímos?

Uma aplicação para que ONG's possam divulgar seus casos e conseguir financiamento voluntário para cada um deles.

### 1º Dia

Foi apresentado o projeto, cujo mockup do layout foi construído no [figma](https://www.figma.com/). Também fizemos o ritual do "Hello World" em cada tecnologia utilizada. É possível acessar esses tutoriais aqui:

- [NodeJS](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [React](https://reactjs.org/docs/hello-world.html)

### 2º Dia

No segundo dia construímos o back-end da aplicação com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/docs/guides/getting-started-guide/)
Utilizamos o nodejs como base da aplicação para gerenciar a conexão entre o front-end e o banco de dados. Foram utilizadas as seguintes bibliotecas:

	 - [Express](https://expressjs.com/) => Utilizado para gerenciar as requisições, rotas e URLS. As configurações de conexão podem ser acessadas [aqui](https://github.com/emanuelgustavo/be-the-hero-semana-omnistack11-rocketseat/blob/master/Back-End/src/routes.js) e [aqui](https://github.com/emanuelgustavo/be-the-hero-semana-omnistack11-rocketseat/blob/master/Back-End/src/app.js)
	 - [Nodemon](https://nodemon.io/) => Utilzado para monitorar as alterações em todos os arquivo e dar "restart" no servidor.
	 - [SQLite](https://www.sqlite.org/index.html) => Para o banco de dados.
	 - [Knex](http://knexjs.org/) => Para gerenciar o banco de dados, com o CRUD completo. O banco de dados foi instalado através do Knex conforme mostrado [aqui](http://knexjs.org/#Installation).
	 - [CORS](https://expressjs.com/en/resources/middleware/cors.html) => Para permitir o acesso do front-end e mobile à aplicação. 

##### Definição de Entidades e Funcionalidades:

- Entidades:
	 - [ONG](https://github.com/emanuelgustavo/be-the-hero-semana-omnistack11-rocketseat/blob/master/Back-End/src/database/migrations/20200325175150_create_ongs.js)
	 - [Caso (Incident)](https://github.com/emanuelgustavo/be-the-hero-semana-omnistack11-rocketseat/blob/master/Back-End/src/database/migrations/20200325181748_create_incidents.js)
- Funcionalidades
	 - Login/Logout da ONG
	 - Cadastro da ONG
	 - Deletar Casos
	 - Listar casos específicos de uma ONG
	 - Listar todos os casos
	 - Entrar em contato com a ONG

### 3º Dia

Nesse dia contruímos o front-end da aplicação, utilizando [React](https://reactjs.org/docs/hello-world.html) e outras bibliotecas:

- [Axios](https://github.com/axios/axios) => cliente HTTP, onde é possível fazer request HTTP do nodeJs.
- [React Icons](https://react-icons.netlify.com/#/icons/md) => biblioteca que permite a inserção de ícones como componentes dentro da aplicação.

### 4º Dia

Nesse dia construímos o app mobile, utilizando o [React Native](https://reactnative.dev/) e [Expo](https://expo.io/).

Utlizamos a [Stack Navigation](https://reactnavigation.org/docs/stack-navigator/) para o nosso app.

Outras bibliotecas utilizadas nesse projeto mobile:
- [expo-constants](https://docs.expo.io/versions/latest/sdk/constants/#constantsstatusbarheight) => Utilizado para estilizar o margin na parte de cima do smartphone para não ficar abaixo da barra de status.
- [expo-mail-composer](https://docs.expo.io/versions/latest/sdk/mail-composer/) => Utilizado para a funcionalidade de envio de email para a ONG.
- [deep-linking](https://reactnavigation.org/docs/deep-linking/) => Utilizado para acessar o What's app na funcionalidade de entrar em contato com a ONG.
- [INTL](https://github.com/andyearnshaw/Intl.js#readme) => Utilizado para formatar os números na UI.

### 5º Dia - Tópicos avançados

Nesse dia adicionamos validação e testes na nossa aplicação:

- [celebrate](https://www.notion.so/5-Dia-831f075acaed4bb4bfb25f989e2754be#e8a587f766a54b5a806b892c1ffd4050) => Utilizado para fazer as validações nos dados enviados ao banco de dados.
- [Joi](https://www.notion.so/5-Dia-831f075acaed4bb4bfb25f989e2754be#9f60e9c6baf244bc8e03fab9efde663b) => Utilizado em conjunto com o celebrate para a validação dos dados.
- [Jest](https://www.notion.so/5-Dia-831f075acaed4bb4bfb25f989e2754be#ba50b465c4f042aabc3c064f59540376) => Utilizado para os testes unitários e de integração, implementados [aqui](https://github.com/emanuelgustavo/be-the-hero-semana-omnistack11-rocketseat/tree/master/Back-End/tests)
- [cross-env](- [cross-env](https://github.com/kentcdodds/cross-env#readme) => Utilizado para utilizar variáveis de ambiente para os testes de integração. [Veja mais](https://www.notion.so/5-Dia-831f075acaed4bb4bfb25f989e2754be#0f721afa9b4242df894faaacf1e1996a)
- [supertest](https://github.com/visionmedia/supertest) => Utilizado para os testes com HTTP.


------------



## Agradecimentos

Depois de uma semana intensa, tenho muito a agradecer a equipe da [Rocketseat](https://rocketseat.com.br/) pelo empenho, dedicação e disponibilidade demonstradas nesse evento. Foi minha primeira participação e com certeza não será a última. Um agradecimento especial também ao [Filipe Deschamps](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw) pelos e-mail diários com sua opinião sobre todas as aulas da semana.

Um salve de Santa Catarina e até a próxima!


# Pós Semana Omnistack

Após o término da semana Omnistack e da conclusão do projeto, resolvi implementar alguma features para continuar evoluindo o que aprendi no curso. 

## Novas features:

- Inclusão do cadastro de voluntários
- Criação de dashboard do voluntário e da ong
- Incidents com status e prazo para arrecadação


