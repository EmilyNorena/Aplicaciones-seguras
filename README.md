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
