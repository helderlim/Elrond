# REST API

## Dinâmica

- [Sobre o projeto](#user-content-sobre-o-projeto)
- [Métodos HTTP](#user-content-o-que-é-http)
- [O que é uma API](#user-content-o-que-é-uma-api-)
- [Conceito de REST API](#user-content-conceito-de-rest-api)
- [Express](#user-content-express)
- [Consumindo API com Axios](#user-content-axios)
- [Boas práticas REST](#user-content-boas-práticas)

---

# Sobre o projeto

## Elrond - API REST

Esse projeto possue dois diretórios, /client que é nosso frontend em ReactJS e /api que é a nossa api no lado server com Express e testado em Jest 

A regra de negócio é simples, uma aplicação para possibilitar todo o CRUD de uma publicação (como uma rede social), então é possível criar posts para serem visualizados. 

A finalidade principal é a apresentação FieldHack da empresa Field Control, no qual sou desenvolvedor FullStack atualmente. 

## Tecnologias

- *[ReactJS](https://pt-br.reactjs.org/)*
- *[Axios](https://axios-http.com/ptbr/docs/intro)*
- *[Express](https://expressjs.com/pt-br/api.html)*
- *[Jest](https://jestjs.io/pt-BR/)*
- *[MongoDB](https://www.mongodb.com/pt-br)*
- *[Mongoose](https://mongoosejs.com/)*

## Como rodar o projeto

Seguir o processo de clonagem do github: 

```jsx
$ git clone git@github.com:helderlim/Elrond.git  
```

Acesse cada diretório e siga os passos

### No server

Aqui temos uma particularidade tá 

No mongoDB eu limitei para que o acesso ao banco fosse somente pelo meu ip da minha maquina, mas você pode criar uma conta em [mongodb](https://www.mongodb.com/pt-br) e utilizar o seu próprio banco. 

para isso troque a chave pela fornecida no portal em api/app.js linha 47: 

```jsx
mongoose.connect('mongodb+srv://name-seu-projeto:sua-chave@cluster0.qatt4.mongodb.net/messages?retryWrites=true&w=majority')
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log('connection err database ', err))
```

Não se preocupe por ser um banco baseado em docs tu não precisa de uma estrutura como acontece no SQL. 

Para rodar a API.

```jsx
$ cd api 
$ nvm use
$ npm install
$ npm run start
```

### No client

```jsx
$ cd client 
$ nvm use 
$ npm install 
$ npm run start
```

Para rodar os testes -  mantenha o server rodando

```jsx
$ cd api 
$ nvm use 
$ npm test 
```

# O que é HTTP

Esse conceito é muito mais comum do que parece , basicamente toda a web é baseada no protocolo HTTP (Hypertext Trasnfer Protocol) ou HTTPS (Hypertext Transfer Protocol Secure), basta acessar aquela rede social favorita ou plataforma de streaming. 

![HTTP IMAGE](https://user-images.githubusercontent.com/54562655/166166343-ac6e8306-4c65-4a85-8e8d-13615e0a0b10.png)

Para conhece-la melhor note que em seu navegador há um cadeado antes da barra de navegação, esse cara esta te informando que esse portal é seguro. Você deve se perguntar - Porque em outras paginas o navegador informa como não seguro? - Por conta daquele portal não possuir um cara chamado SSL, que é um certificado de segurança informando que aquele acesso esta criptografado. Por isso que existe o HTTPs, uma implementação do protocolo HTTP com criptografia na comunicação web. 

Existe um certa importância para os usuários terem seus dados protegidos, essa comunicação com SSL impossibilita de hackers malicioso terem acesso aos seus dados em algum cadastro por exemplo. Por isso fica a dica, nunca forneça seus dados a sites não seguros ( principalmente quando o navegador avisar). 

Bom agora que você já conhece o esboço do HTTP vamos nos aprofundar um pouco mais sobre o assunto. 

## Estrutura HTTP

Para a criação de APIs - falaremos mais sobre - utilizamos os métodos (ou verbos) HTTP, são tipos de requisições onde cada um tem sua função, vejamos abaixo os 4 principais métodos: 

### GET

Esse método serve para busca de dados da API por um identificador (muito utilizado o ID) ou uma coleção de dados. Temos como exemplo o acesso ao Instagram, todas aquelas publicações estão vindo do banco de dados, servidos pela API para serem exibidos no client que pode ser tanto o APP quanto na página web. 

### POST

Cria um novo dado em uma coleção já existente ou não. Basicamente um novo registro na API. 

### PUT

Esse método edita ou atualiza certo dado ou coleção de dados. Ele realiza o update ou atualização.

### DELETE

Como seu nome já diz serve para remover registros na API. 

---

# O que é uma API ?

Ao chegar em um restaurante não pedimos a comida diretamente para a cozinha certo? Temos um intermediador, o garçom. Sem ele o pedido estaria pronto e não iriamos estar ciente disso, a comida esfriaria e ficaremos com fome. Assim acontece com API, ele é o nosso intermediador entre o client e o server. Todo o gerenciamento de status, tratamento de erro e resposta da requisição ocorre por essa camada de interface. 

O mais legal das API é que elas podem ser publicas ou não, e as publicas nos ajudam muito principalmente na criação de portfólio, testes em um processo seletivo e até mesmo nos estudos. As principais API publicas são: 

- **Marvel API - [https://developer.marvel.com/](https://developer.marvel.com/)**
- Google Maps - [https://developers.google.com/maps?hl=pt-br](https://developers.google.com/maps?hl=pt-br)
- Mailchimp - [https://mailchimp.com/developer/](https://mailchimp.com/developer/)
- Nasa - [https://api.nasa.gov/](https://api.nasa.gov/)
- Unsplash [https://unsplash.com/developers](https://unsplash.com/developers)

Basta acessar a documentação e seguir os passos. 

# Conceito de REST API

Como já dito antes uma API serve como camada entre o client e o server. 

![REST API IMAGE](https://user-images.githubusercontent.com/54562655/166166377-b7102623-64a7-44d9-8418-862fba169d07.png)


Temos algumas características sobre REST API. Toda a comunicação é realizada por endpoints, que são rotas ou path que utilizando o método HTTP realizam uma tarefa na API.

Outro ponto é que REST API não é uma arquitetura, biblioteca ou framework, é simplesmente um modelo para requisições na web. Nesse caso o front-end e o back-end são distintos, então podemos criar uma API que pode ser consumida tanto por um app quanto por uma página web. 

### Realizando requisições

Para realizar uma requisição temos que cumprir alguns passos

- Escolher o método HTTP (GET, POST, PUT, DELETE)
- Utilizar um header que é o cabeçalho da requisição, serve para definirmos regras ou acessarmos permissões na API.
- Acessar um path (http://my-api/user) que seria a nossa rota.
- E obter um body, o corpo da requisição.

Temos como exemplo essa requisição em JavaScript puro 

```jsx
//ação do botão 
postButton.addEventListener('click', () => {
	//requisição com fetch 
	fetch('http://localhost:8080/customer', {
	//o metodo HTTP
	method:'POST',
	//Corpo da minha requisição
	body: JSON.stringfy({
		name: 'Helder lima',
		description: 'Criando um novo cliente'
	}),
	//regras da minha requisição
	headers: {
		'Content-Type': 'application/json'
	}
	})
	.then(res => res.json())
	.then(resData => console.log(resData))
	.catch(err => console.log(err)
})
```

# Express

Express é um framework  node.js para criação de APIs no server. Essa ferramenta alem de ser fácil implementação ela é escalável e solida. 

Express tem uma ótima documentação possibilitando a criação do primeiro endpoint em poucos minutos. Aqui temos um exemplo do primeiro endpoint: 

 

```jsx
const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	console.log(`ola mundo`
})

app.listen (port, () => {
	console.log(`Exemplo de requisição porta: ${port}`)
})
```

acesse os diretórios da api para ver mais como essa ferramenta esta sendo implementada para cria uma REST API. 

---

Para consumir essa API no client estou utilizando o método padrão fetch, mas para os tests em jest estou utilizando o axios

---

## Jest - Teste unitário

[https://jestjs.io/pt-BR/](https://jestjs.io/pt-BR/)

Jest é uma estrutura de teste JavaScript mantida pela Meta, projetada e construída por Christoph Nakazawa com foco na simplicidade e suporte para grandes aplicativos da web. Trabalha com projetos usando Babel, TypeScript, Node.js, React, Angular, Vue.js e Svelte.

## Axios

Axios é um cliente HTTP *[baseado-em-promessas](https://javascript.info/promise-basics)* para o `[node.js](https://nodejs.org/)`
 e para o navegador. É *[isomórfico](https://www.lullabot.com/articles/what-is-an-isomorphic-application)* (= pode rodar no navegador e no node.js com a mesma base de código). No lado do servidor usa o código nativo do node.js - o modulo `http`
, enquanto no lado do cliente (navegador) usa XMLHttpRequests

---

# Boas Práticas

- EndPoint - Descreva corretamente seus endpoints

```jsx
router.get('/getAllProjects', newController);
```

```jsx
router.get('/projects', newController);
```

- Status code - Utilize de forma correta

2xx requisição foi recebida e processada com sucesso

5xx requisição é valida, porem ocorreu um erro inesperado no servidor

4xx requisição de maneira errada

- Regra de ouro - Legibilidade de código (escreva para outro dev ler)
- Obtenha uma boa documentação
