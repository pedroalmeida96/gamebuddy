# gamebuddy

```bat
sudo chown $USER /var/run/docker.sock
docker-compose pull
docker-compose up -d
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
```

Update ao jogo quando um user se junta (/join)
Melhorar localizaçao
[] validator para garantir que jogo nao está já cheio