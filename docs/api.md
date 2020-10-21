# Documentación API

Estos son todos los puntos de entrada y métodos disponibles en la API.

Se asume la variable `apiUrl` como `http://localhost:8000/`.

## Usuarios

Las rutas para gestionar usuarios:

- Registro usuario: `POST {{apiUrl}}/api/auth/register`

```json
{
  "name": "Nombre del Usuario",
  "email": "Correo del Usuario",
  "password": "Contraseña del Usuario"
}
```

- Inicio de sesión: `POST {{apiUrl}}/api/auth/login`

```json
{
  "email": "Correo del Usuario",
  "password": "Contraseña del Usuario"
}
```

- Listar usuarios: `GET {{apiUrl}}/api/auth/users`

- Obtener un usuario: `GET {{apiUrl}}/api/auth/users/{{user}}`

  - `{{user}}`: ID del usuario

- Actualizar usuario: `PUT {{apiUrl}}/api/auth/users/{{user}}`

  - `{{user}}`: ID del usuario

```json
{
  "name": "Nombre del Usuario",
  "email": "Correo del Usuario",
  "password": "Contraseña del Usuario"
}
```

- Eliminar un usuario: `DELETE {{apiUrl}}/api/auth/users/{{user}}`

  - `{{user}}`: ID del usuario

## Autores

Las rutas para obtener los autores:

- Listar autores: `GET {{apiUrl}}/api/authors`

- Crear autor: `POST {{apiUrl}}/api/authors`

```json
{
  "name": "Nombre del Autor",
  "country": "País de origen del autor"
}
```

- Obtener un autor: `GET {{apiUrl}}/api/authors/{{author}}`

  - `{{author}}`: ID del autor

- Actualizar autor: `PUT {{apiUrl}}/api/authors/{{author}}`

  - `{{author}}`: ID del autor

```json
{
  "name": "Nombre del Autor",
  "country": "País de origen del autor"
}
```

- Eliminar un autor: `DELETE {{apiUrl}}/api/authors/{{author}}`

  - `{{author}}`: ID del autor

### Libros de un autor

- Obtener libros de un autor: `GET {{apiUrl}}/api/authors/{{author}}/books`

  - `{{author}}`: ID del autor

- Relacionar un libro con el autor: `POST {{apiUrl}}/api/authors/{{author}}/books`

  - `{{author}}`: ID del autor

```json
{
  "book": "ID del Libro",
}
```

- Quitar relación de libro con el autor: `DELETE {{apiUrl}}/api/authors/{{author}}/books`

  - `{{author}}`: ID del autor

```json
{
  "book": "ID del Libro",
}
```

## Libros

Las rutas para obtener los libros:

- Listar libros: `GET {{apiUrl}}/api/books`

- Crear libro: `POST {{apiUrl}}/api/books`

```json
{
  "title": "Título del libro"
}
```

- Obtener un libro: `GET {{apiUrl}}/api/books/{{book}}`

  - `{{book}}`: ID del libro

- Actualizar libro: `PUT {{apiUrl}}/api/books/{{book}}`

  - `{{book}}`: ID del libro

```json
{
  "title": "Título del libro"
}
```

- Eliminar un libro: `DELETE {{apiUrl}}/api/books/{{book}}`

  - `{{book}}`: ID del libro

### Autores de un libro

- Obtener autores de un libro: `GET {{apiUrl}}/api/books/{{book}}/authors`

  - `{{book}}`: ID del libro

- Relacionar un autor con el libro: `POST {{apiUrl}}/api/books/{{book}}/authors`

  - `{{book}}`: ID del libro

```json
{
  "author": "ID del Autor",
}
```

- Quitar relación de autor con el libro: `DELETE {{apiUrl}}/api/books/{{book}}/authors`

  - `{{book}}`: ID del libro

```json
{
  "author": "ID del Autor",
}
```
