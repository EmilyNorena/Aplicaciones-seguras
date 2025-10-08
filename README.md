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

<img width="806" height="219" alt="image" src="https://github.com/user-attachments/assets/deb1a54a-7a5a-43c8-9e70-9516cdf95d58" />


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
  - Registro con encriptación BCrypt
  - UserDetailsService
  - Repository con MariaDB/RDS

- Endpoints Protegidos
  - /auth/** → Públicos (login/register)
  - Resto de endpoints → Requieren JWT

## Proxy + TLS
Creamos un dominio para el backend haciendo uso de DuckDNS: secure-app-back.duckdns.org. Usamos este dominio para configurar el canal seguro entre el frontend y el backend. En el servidor Spring instalamos Nginx con el fin de separar las responsabilidades de la siguiente forma:
- Nginx: Maneja SSL, carga estática
- Spring Boot: Solo lógica de negocio 
