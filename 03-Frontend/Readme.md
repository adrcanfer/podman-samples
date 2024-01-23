# Frontend
### Introducción
Este ejemplo tiene como objetivo crear un contenedor con la imagen de NGINX que nos permita alojar nuestro frontal.

### Instrucciones
Para ello, debemos ejecutar los siguientes pasos:
 
1. Creación del contenedor:
   `podman run --name hero-front --network hero-network -p 8082:80 -v ./03-Frontend/statics:/usr/share/nginx/html  -v ./03-Frontend/conf:/etc/nginx/conf.d -d nginx` 
