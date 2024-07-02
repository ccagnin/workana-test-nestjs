
# Teste para projeto workana com NestJS




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET_KEY`

`REFRESH_SECRET`


## Funcionalidades

- Cadastro de usuário
- Login
- Listagem de todos os usuários apenas depois de logado
- Alterar email da conta (apenas por console/terminal)


## Stack utilizada

**Front-end:** HTML, CSS, Javascript (apenas para demonstração)

**Back-end:** Nest, Node, Express, SQLite, TypeORM.


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/ccagnin/workana-test-nestjs/
```

Entre no diretório do projeto

```bash
  cd workana-test-nestjs
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

O front estará no `localhost:3000` e o backend no `localhost:4000`. Também é possível testar pelo Swagger em `localhost:4000/api`

