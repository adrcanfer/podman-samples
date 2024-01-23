# Backend
### Introducción
Este ejemplo tiene como objetivo generar un contenedor con una API REST desarrollada con Spring Boot y que se conecte a la BBDD anterior

### Instrucciones
Para ello, debemos ejecutar los siguientes pasos:

1. Construcción de la imagen.
   `podman build --build-arg JAR_FILE=./hero.jar --tag spring .` 
2. Creación del contenedor:
   `podman run --name hero-back --network hero-network -d spring` 
