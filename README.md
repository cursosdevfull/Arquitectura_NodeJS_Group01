# Docker

### Descargar una imagen

```
docker pull mysql:8
```

### Crear un contenedor

```
docker create --name mysql-server mysql:8
```

### Iniciar un contenedor

```
docker start mysql-server
```

### Listar contenedores ejecutándose

```
docker ps
```

### Listar contenedores

```
docker ps -a
```

### Ver log

```
docker logs mysql-server
```

### Crear un volumen

```
docker volume create mysqlvol
```

### Crear un contenedor

```
docker run -d --name mysql-server -p 3340:3306 -e MYSQL_ROOT_PASSWORD=12345 -v mysqlvol:/var/lib/mysql mysql:8
```

### Filtrar la lista de contenedores

```
docker ps -a | grep mysql-server
```

### Eliminar un contenedor

```
docker rm -f mysql-server
```
