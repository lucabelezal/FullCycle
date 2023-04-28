O projeto está em [api-tools-skeleton](https://github.com/codeedu/api-tools-skeleton)

Clone o projeto e execute os seguintes comandos:

```
docker build -t api-tools-test .
```
```
docker run -p 8000:80 -v $(pwd):/var/www api-tools-test
```
Agora basta testar no browser http://localhost:8000

___

API Tools usada no módulo de Comunicação do curso FullCycle
Rodar a aplicação
Rode o comando

```
docker-compose up
```

Acessar http://localhost:8080 para testar o projeto.