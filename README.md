### 2BDigital - Teste

#### Project setup
Em primeiro lugar é necessário que você tenha o '**_yarn_**' instalado e saiba como utilizar o **_terminal_** para rodar os comandos da aplicação.

Em sua máquina e rode o comando abaixo para instalação dos pacotes(**Obs:** é necessário que você já tenha acessado a pasta do projeto pela linha de comando) :
```
yarn install
```

O Próximo passo é poder instalar o '_mkcert_' para poder trabalhar com o HTTPS de forma local. Siga as intruções para instalação de acordo com o seu sistema operacional no [link do projeto](https://github.com/FiloSottile/mkcert) e depois efetue os seguintes comandos na pasta do projeto:

```
mkcert -install
```

```
mkcert licensed "*.licensed" licensed localhost 127.0.0.1 ::1
```

Em Seguida para compilar o projeto, rode o seguinte comando na pasta do projeto

```
yarn serve
```
