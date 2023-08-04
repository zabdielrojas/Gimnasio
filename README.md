# Proyecto02 💪🏋️‍♀️

Aplicación para organizar los entrenamientos en un gimnasio, tanto para los usuarios como para los trabajadores.

## Descripción 📝

Implementar una API que permita publicar ejercicios para la gestión de los mismos en un gimnasio.

## Usuarios Cliente 👥

Pueden registrarse o hacer login en la aplicación, explorar la lista de ejercicios disponibles y ver sus detalles como nombre, descripción o grupo muscular, también pueden marcar sus ejercicios como favoritos para verlos después o filtrar ejercicios según necesiten.

- Pueden ver el listado de los ejercicios y entrar en el detalle de los mismos.
- Podrán filtrarlos por algunas características (por ejemplo, tipología o grupo muscular).
- Podrán poner o quitar un like a un ejercicio.

## Administrador 👤

- Todas las funcionalidades de usuario cliente.
- Será el único capaz de añadir un nuevo ejercicio con los siguientes detalles:
  - Nombre
  - Descripción
  - Foto
  - Tipología
  - Grupo muscular.

## Opcional 🌟

- Los usuarios y trabajadores pueden seleccionar algunos ejercicios para ponerlos entre los favoritos, útil para poder organizar una clase de entrenamiento.


### Bases de Datos 🗄️

#### Favorites

| Campo       | Tipo         | Descripción                             |
| ----------- | ------------ | --------------------------------------- |
| Id          | TINYINT(50)  | Identificador único del favorito       |
| user_id     | INT          | Identificador del usuario que puso el favorito |
| exercise_id | INT          | Identificador del ejercicio favorito    |
| created_at  | TIMESTAMP    | Fecha y hora de creación del favorito   |

#### Ejercicios

| Campo       | Tipo         | Descripción                             |
| ----------- | ------------ | --------------------------------------- |
| Id          | TINYINT(50)  | Identificador único del ejercicio       |
| Name        | VARCHAR(50)  | Nombre del ejercicio que realiza        |
| photo       | VARCHAR(100) | Que describa él ejercicio               |
| musclegroup | VARCHAR(100) | Grupo muscular que trabaja el ejercicio |
| description | TEXT         | Descripción de ejercicio                |

#### Usuarios 

| Campo       | Tipo         | Descripción                                  |
| ----------- | ------------ | -------------------------------------------- |
| id          | INT         | Identificador único del usuario             |
| email       | VARCHAR(100) | Correo electrónico del usuario              |
| Name        | VARCHAR(50)  | Nombre del usuario                          |
| lastName    | VARCHAR(100) | Apellidos del usuario                       |
| birthDate   | DATETIME     | Fecha de nacimiento del usuario             |
| photo       | CHAR(100)    | Foto de usuario                             |
| role        | ENUM         | Rol del usuario ("Cliente") o ("Administrador") |
| Listar      | VARCHAR(100) | Ver listado y detalle de los ejercicios     |
| select      | VARCHAR(100) | Seleccionar ejercicios para ponerlos entre los favoritos |
| like        | VARCHAR(100) | Dar/quitar like a un ejercicio              |


### Extensiones NPM Usadas 📦

#### DevDependencies

- eslint: ^8.45.0
- nodemon: ^3.0.1

#### Dependencies

- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- express-fileupload: ^1.4.0
- jsonwebtoken: ^9.0.1
- morgan: ^1.10.0
- mysql2: ^3.5.2
- prettier: ^1.1.0

### CORS 🌐

directorio uploads/fotos como static `<img src="http://localhost:8000/43t4345tg3456g65.jpg">`

### **Endpoints de Usuarios** 👥


- **POST** - [/users/register] - Crea un nuevo usuario pidiendo todos los datos incluida la foto (body formData).
  :large_orange_circle: Falta probar postman y revisar las rutas
- **POST** - [/users/login] - Logea a un usuario retornando un token, email, avatar y rol.
  :large_orange_circle: Falta probar postman y revisar las rutas
- **GET** - [/users] - devuelve los datos del usuario del token (token)
  :large_orange_circle: Falta probar postman y revisar las rutas

### **Endpoints ejercicios** 🏋🏻‍♂️

- **POST** - [/exercises/addNewExercise] - Permite al administrador subir un ejercicio con foto (body formData). (TOKEN y rol admin)
  :large_orange_circle: Falta probar postman y revisar las rutas

- **DELETE** - [/exercises/:exerciseId/deleteExercise] - Permite al administrador eliminar un ejercicio (TOKEN y rol admin)
  :large_orange_circle: Falta probar postman y revisar las rutas

- **GET** - [/exercises/filterExercises/:getAllExercises, :getExerciseById, :getExerciseByName, :getFavoriteExercises, :getExercisesByMuscleGroup] - Permite buscar ejercicios por diferentes métodos de filtrado o mostralos todos. (TOKEN)
  :large_orange_circle: Falta probar postman y revisar las rutas

- **GET** - [/exercises/favorite] - Retornar el listado del los ejercicios favoritos del usuario de token (TOKEN)
  :large_orange_circle: Falta probar postman y revisar las rutas

- **POST** - [/exercises/:exerciseId/addToFavorites,removeFromFavorites] - Permite a un usuario dar o quitar de favoritos a un ejercicio (tenerlo o no en preferidos). (TOKEN)
  :large_orange_circle: Falta probar postman y revisar las rutas

- **GET** - [/exercises/getExerciseInfo] - Retornar información de un ejercicio (incluida la description).
  :large_orange_circle: Falta probar postman y revisar las rutas

