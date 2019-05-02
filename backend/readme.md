deve ser instalado os pacotes do projeto dentro da pasta

npm install

O projeto esta usando como banco de dados o mysql
no arquivo ficam as configurações de conexão com o banco, trocar para as locais em development src/config/config.json

ao inicializar o banco pela primeira vez é adicionado o usuário teste@teste.com com a senha 1234

para inicializar é so utilizar 
node . 
ou 
nodemon . 

o servidor esta configurado para utilizar a porta 3000, podendo ser alterada no arquivo src/config/enviroments.js