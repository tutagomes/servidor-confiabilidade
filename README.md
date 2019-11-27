# servidor-confiabilidade
Repositório para hospedar o código do Locust e do servidor de API para teste de confiabilidade



### Para executar os testes utilizando somente uma instância:

##### Executando Servidor

```bash
cd Servidor
npm install
npm start
```



##### Executando Testes

```bash
pip3 install locust
locust -f Teste/locust.py --host=http://localhost:8080
```





### Para executar os testes com Docker

##### Executando Servidor

```bash
cd Servidor
docker build -t teste-calculo-node .
docker swarm init
docker stack deploy --compose-file docker-compose.yml stackdemo
```



##### Executando Testes

```bash
pip3 install locust
locust -f Teste/locust.py --host=http://localhost:4000
```

