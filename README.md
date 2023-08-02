# Proyecto02

Aplicación para organizar internamente los entrenamientos en un gimnasio.

DESCRIPCIÓN
Implementar una API que permita publicar ejercicios para la gestión de los mismos en un
gimnasio. Los usuarios serán los trabajadores del gimnasio.

USUARIOS ANÓNIMOS
Pueden ver la landing de la plataforma donde podrán registrarse o hacer login.

ADMINISTRADOR
● Será el único a poder añadir un nuevo ejercicio:
○ nombre
○ descripción
○ foto
○ tipología
○ grupo muscular
○ ...
● Puede modificar o eliminar un entrenamiento

USUARIOS Y TRABAJADORES

- Puede ver el listado del los ejercicios y entrar en el detalle de los mismos.
- Podrá filtrarlos por algunas características (ej: tipología o grupo muscular).
- Podrá poner o quitar un like a un ejercicio.

OPCIONAL
● Los usuarios y trabajadores pueden seleccionar algunos ejercicios para ponerlos
entre los favoritos, útil para poder organizar una clase de entrenamiento.

● SEMÁFORO DE FLUJO DE TRABAJO
En proceso 🟡
Errores por corregir 🔴
Terminado 🟢

● BASES DE DATOS

### Trabajadores (Administrador)

| Campo     | Tipo         | Descripción                       |
| --------- | ------------ | --------------------------------- |
| Id        | TINYINT(50)  | Identificador único del usuario   |
| Email     | VARCHAR(100) | Correo electrónico del usuario    |
| firstName | VARCHAR(50)  | Nombre del usuario                |
| lastName  | VARCHAR(100) | Apellidos del usuario             |
| birthDate | DATETIME     | Fecha de nacimiento del usuario   |
| photo     | CHAR(40)     | Foto usuario                      |
| admin     | TINYINT      | Rol del usuario ("Administrador") |

### Ejercicios

| Campo       | Tipo         | Descripción                             |
| ----------- | ------------ | --------------------------------------- |
| Id          | TINYINT(50)  | Identificador único del ejercicio       |
| Name        | VARCHAR(50)  | Nombre del ejercicio que realiza        |
| photo       | VARCHAR(100) | Que describa él ejercicio               |
|             |
| musclegroup | VARCHAR(100) | Grupo muscular que trabaja el ejercicio |
| description | TEXT         | Descripción de ejercicio                |

### Usuarios (Cliente)

| Campo     | Tipo         | Descripción                                              |
| --------- | ------------ | -------------------------------------------------------- |
| id        | TINYINT(50)  | Identificador único del usuario                          |
| email     | VARCHAR(100) | Correo electrónico del usuario                           |
| Name      | VARCHAR(50)  | Nombre del usuario                                       |
| lastName  | VARCHAR(100) | Apellidos del usuario                                    |
| birthDate | DATETIME     | Fecha de nacimiento del usuario                          |
| photo     | CHAR(100)    | foto de usuario                                          |
| role      | ENUM         | Rol del usuario ("Cliente")                              |
| Listar    | VARCHAR(100) | Ver listado y detalle de los ejercicios                  |
| select    | VARCHAR(100) | Seleccionar ejercicios para ponerlos entre los favoritos |
| like      | VARCHAR(100) | Podrá poner o quitar un like a un ejercicio              |

● EXTENSIONES NPM USADAS

npm init -y
npm i express
npm nodemon -D
npm mysql2 dotenv

### **Endpoints de Usuarios**

- **POST** - [/users/register] - Crea un nuevo usuario pidiendo todos los datos incluida la foto (body formData).
- **POST** - [/users/login] - Logea a un usuario retornando un token, email, avatar y rol.
- **GET** - [/users] - devuelve los datos del usuario del token (token)

### **Endpoints ejercicios**

- **POST** - [/exercises/] - Permite al administrador subir un ejercicio con foto (body formData). (TOKEN y rol admin)
- **DELETE** - [/exercises/:exerciseId] - Permite eliminar un ejercicio (TOKEN y rol admin)
- **GET** - [/exercises] - Retornar el listado de ejercicios (info si tengo un ejercicio en favorito). (TOKEN)
  /ejercicies (todo los ejercicios)
  Query params:
  /ejercicies?grupo=superior (todos los ejercicios del grupo especificado)
  /ejercicies?grupo=superior&favorites=no
  /ejercicies?favorites=no
- **GET** - [/exercises/favorite] - Retornar el listado del los ejercicios favoritos del usuario de token (TOKEN)
- **POST** - [/exercises/:exerciseId/favorite] - Permite a un usuario dar o quitar de favoritos a un ejercicio (tenerlo o no en preferidos). (TOKEN)
- **GET** - [/exercises/:exerciseId] - Retornar información de un ejercicio (incluida la description).

CORS
directorio uploads/fotos como static <img src="http://localhost:8000/43t4345tg3456g65.jpg">
