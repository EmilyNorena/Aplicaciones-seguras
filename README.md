# 🔒Aplicaciones Seguras

## AREP - Emily Noreña Cardozo

## Descripción

**1. Requisitos funcionales**
- Cliente web asíncrono (HTML + JS)
- Backend RESTful en Spring Framework
- TLS en todas las comunicaciones
- Autenticación segura con contraseñas hasheadas

**2. Arquitectura AWS**
- Instancias EC2 para Apache y Spring.
  - Apache Server: sirve contenido estático + TLS
  - Spring Server: REST APIs + TLS

## Trabajo en clase

Durante la clase desplegamos una instancia EC2 en AWS y en ella configuramos Apache. Luego, para habilitar un canal seguro (HTTPS), configuramos certificados autofirmados en clase.

<img width="350" height="143" alt="image" src="https://github.com/user-attachments/assets/2281188c-1c5e-4edf-97bf-ab4a9f234867" />

Documentación:

https://docs.aws.amazon.com/es_es/linux/al2023/ug/ec2-lamp-amazon-linux-2023.html

https://docs.aws.amazon.com/es_es/linux/al2023/ug/SSL-on-amazon-linux-2023.html

## Configuración de un VirtualHost
Usamos DuckDNS para obtener nuestro dominio gratuito: secure-application.duckdns.org. Le debemos asignar la dirección IP de nuestro servidor Apache (cliente).

Creamos el archivo secure-application.duckdns.org.conf dentro del directorio /etc/httpd/conf.d

<img width="740" height="219" alt="image" src="https://github.com/user-attachments/assets/deb1a54a-7a5a-43c8-9e70-9516cdf95d58" />


Recordemos que todos nuestros archivos estáticos (HTML, CSS Y JS) se encuentran en el directorio /var/www/html.

<img width="1998" height="1002" alt="image" src="https://github.com/user-attachments/assets/934a653d-afcd-46fd-9642-458fecdb8146" />

## Configuración TLS
Utilizamos Certbot para obtener certificados TLS de Let’s Encrypt.

`sudo dnf install certbot python3-certbot-apache -y`

`sudo certbot --apache -d secure-application.duckdns.org`

<img width="1998" height="1007" alt="image" src="https://github.com/user-attachments/assets/81065a12-eac3-4d34-85b1-39c5b575d2a3" />

## Almacenamiento de contraseñas en formato hash
Haciendo uso de la herramienta RDS de AWS, creamos una base de datos en MariaDB para hacer el respectivo almacenamiento de las contraseñas en formato hash.

`mysql -h secure-app-db.ct424kkk457d.us-east-1.rds.amazonaws.com -P 3306 -u admin -p`

## JWT 
<img width="824" height="574" alt="image" src="https://github.com/user-attachments/assets/0160b5fd-28af-421f-898c-526d9e070859" />

Funcionalidades implementadas:
- Autenticación JWT
  - Login con email/contraseña
  - Generación de token JWT
  - Validación automática de tokens
    
- Security Config
  - Filtro JWT para proteger endpoints
  - Configuración de CORS y CSRF

- Gestión de Usuarios
  - Registro con encriptación BCrypt para posterior almacenamiento en la base de datos.
  - UserDetailsService
  - Repository con MariaDB/RDS

- Endpoints Protegidos
  - /auth/** → Públicos (login/register)
  - Resto de endpoints → Requieren JWT

## Proxy + TLS
Creamos un dominio para el backend haciendo uso de DuckDNS: secure-app-back.duckdns.org. Usamos este dominio para configurar el canal seguro entre el frontend y el backend. En el servidor Spring instalamos Nginx con el fin de separar las responsabilidades de la siguiente forma:
- Nginx: Maneja SSL, carga estática
- Spring Boot: Solo lógica de negocio

En el archivo /etc/nginx/nginx.conf añadimos esta configuración, la cual permite:

- Manejar peticiones HTTPS en el puerto
- Maneja los certificados SSL
- Redirige las peticiones a Spring Boot en puerto 8080. 

<img width="774" height="537" alt="image" src="https://github.com/user-attachments/assets/4ad1feb8-35d2-4d9a-a494-deb33615563c" />

## Arquitectura

Arquitectura Servidor Proxy
<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/9417cb4f-ca3f-45ec-8dc2-543d87b31324" />


## Funcionamiento y video

En primer lugar, ejecutamos nuestras dos instancias EC2 (Apache Server y Spring Server). En DuckDNS debemos asignar las respectivas IP's para poder resolver los dominios de nuestra aplicación, como se muestra en la imagen.
<img width="1448" height="211" alt="image" src="https://github.com/user-attachments/assets/10688c31-dc66-4e45-ab96-9d3b30c898f0" />

En el servidor Apache, ejecutamos `sudo systemctl start httpd` para iniciar el servicio Apache HTTPD. Habilita el servidor web para servir páginas.

En el servidor Spring, ejecutamos `sudo systemctl start nginx` para iniciar el servidor Nginx, el cual funciona como un proxy inverso y redirige las peticiones del cliente al servidor Spring. Finalmente ejecutamos nuestra aplicación usando `java -jar secure-app.jar`.

<img width="1890" height="944" alt="image" src="https://github.com/user-attachments/assets/bad9935a-bf34-47a9-93d4-39bf1f7afff9" />

<img width="1882" height="948" alt="image" src="https://github.com/user-attachments/assets/364a7d0d-bd54-4908-98f6-66611b901beb" />

En la base de datos podemos verificar el correcto almacenamiento de nuestro usuario con su contraseña en formato hash.

<img width="1140" height="300" alt="image" src="https://github.com/user-attachments/assets/17af781d-bfbe-4bf2-9e13-638ba0c654e7" />

**VIDEO:** https://youtu.be/3vfeybvY9Mc
