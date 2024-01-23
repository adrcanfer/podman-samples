# MySQL
### Instrucciones
Para este ejemplo usaremos la imagen de MySQL disponible en Docker Hub.

En primer lugar crearemos una red con el siguiente comando:
`podman network create hero-network`

Para levantar nuestro contenedor ejecutaremos el siguiente comando:
`podman run --name hero-db --network hero-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=hero -d mysql`