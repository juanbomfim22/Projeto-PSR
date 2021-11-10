# Projeto-PSR


Backend feito em NodeJS que implementa uma API RESTful.\
* Hospedado no site: https://projeto-psr.herokuapp.com

## Rotas
Métodos | Caminho | Função | Campos | Deve logar ou fornecer token de autenticação
----|:-----:|-----|:------:|---------
GET, DELETE | /users | Mostrar ou excluir, respectivamente, as informações de todos os usuários no banco | - | ❌
GET, DELETE| /user/:id  | Mostrar ou excluir, respectivamente, as informações do usuário com id fornecido | - | ✔️
PUT | /user/:id | Modificar o *username* do usuário com id fornecido | *username* |  ✔️
POST | /signup | Cadastrar um novo usuário |*username, email, password*  | ❌
POST | /signin | Acessar a conta do usuário | *username, password*  | ✔️
POST | /tokensignin | Acessar a conta pelo Google após clicar botão| *id_token* | ✔️
