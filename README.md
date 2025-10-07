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
Creamos el archivo secure-application.duckdns.org.conf dentro del directorio /etc/httpd/conf.d

<img width="406" height="224" alt="image" src="https://github.com/user-attachments/assets/b6fbaeb2-60ff-47a9-a5c6-ae18155200df" />

Recordemos que todos nuestros archivos estáticos (HTML, CSS Y JS) se encuentran en el directorio /var/www/html.

<img width="1998" height="1002" alt="image" src="https://github.com/user-attachments/assets/934a653d-afcd-46fd-9642-458fecdb8146" />

## Configuración TLS
Utilizamos Certbot para obtener certificados TLS de Let’s Encrypt.
`sudo dnf install certbot python3-certbot-apache -y`
`sudo certbot --apache -d secure-application.duckdns.org`

## Configuración DNS
Usamos DuckDNS para obtener nuestro dominio gratuito: secure-application.duckdns.org. Le debemos asignar la dirección IP de nuestro servidor Apache (cliente).
A continuación, en nuestro servidor Apache, nos ubicamos dentro del directorio /etc/httpd/conf.d
