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
● Los usuarios y trabajadores  pueden seleccionar algunos ejercicios para ponerlos
entre los favoritos, útil para poder organizar una clase de entrenamiento.

● SEMÁFORO DE FLUJO DE TRABAJO
En proceso 🟡
Errores por corregir 🔴
Terminado 🟢

● BASES DE DATOS

### Trabajadores (Administrador)

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| Id         | TINYINT(50)   | Identificador único del usuario        |
| Email      | VARCHAR(100) | Correo electrónico del usuario         |
| firstName  | VARCHAR(50)  | Nombre del usuario                     |
| lastName   | VARCHAR(100) | Apellidos del usuario                  |
| birthDate  | DATETIME     | Fecha de nacimiento del usuario        |
| photo     | CHAR(40)     | Foto usuario                           |
| admin      | TINYINT      | Rol del usuario ("Administrador")      |

### Ejercicios
| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| Id         | TINYINT(50)  | Identificador único del ejercicio      |
| Name       | VARCHAR(50)  | Nombre del ejercicio que realiza       |
| photo      | VARCHAR(100) | Que describa él ejercicio              |
              |
| musclegroup| VARCHAR(100) | Grupo muscular que trabaja el ejercicio|
| description | TEXT | Descripción de ejercicio               |


### Usuarios (Cliente)

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | TINYINT(50)  | Identificador único del usuario        |
| email      | VARCHAR(100) | Correo electrónico del usuario         |
| Name       | VARCHAR(50)  | Nombre del usuario                     |
| lastName   | VARCHAR(100) | Apellidos del usuario                  |
| birthDate  | DATETIME     | Fecha de nacimiento del usuario        |
| photo      | CHAR(100)     | foto de usuario                        |
| role       | ENUM         | Rol del usuario ("Cliente")            |
| Listar     | VARCHAR(100) | Ver listado y detalle de los ejercicios|
| select    | VARCHAR(100) | Seleccionar ejercicios para ponerlos entre los favoritos   |
| like       | VARCHAR(100) | Podrá poner o quitar un like a un ejercicio  |


● EXTENSIONES NPM USADAS

npm init -y
npm i express
npm nodemon -D
npm mysql2 dotenv


### **Endpoints de Trabajadores**

- **POST** - [/workers/register] - Crea un nuevo trabajador (usuario del gimnasio).
- **POST** - [/workers/login] - Logea a un trabajador retornando un token.
- **POST** - [/workers/admin] - Permite al administrador subir, borrar o actualizar un ejercicio.
- **PUT** - [/workers/:workerId] - Permite acceder al perfil público de un trabajador.
- **GET** - [/workers] - Retornar el listado de trabajadores.    
- **GET** - [/workers/:workerId] - Retornar información de los trabajadores.

### **Endpoints de Usuarios**

- **POST** - [/users/register] - Crea un nuevo usuario.
- **POST** - [/users/login] - Logea a un usuario retornando un token.
- **POST** - [/exercises/:exerciseId/like] - Permite a un usuario dar like a un ejercicio.
- **PUT** -  [/users/:userId] - Permite acceder al perfil publico de un usuario.
- **GET** - [/exercises/:exerciseId] - Retornar información de un ejercicio.
- **GET** - [/exercises/filter] - Permite filtrar ejercicios por grupo muscular.

### **Endpoints de Administrador**

- **GET** - [/exercises] - Retornar el listado de ejercicios.    
- **GET** - [/exercises/:exerciseId] - Retornar información de un ejercicio.
- **DELETE** - [/exercises/:exerciseId/favorite] - Permite a un usuario quitar un ejercicio de su lista de favoritos.



