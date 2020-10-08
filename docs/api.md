# Documentación API

Estos son todos los puntos de entrada y métodos disponibles en la API.

Se asume la variable `apiUrl` como `http://localhost:8000/`.

## Autores

Las rutas para obtener los autores:

- Listar autores: `GET {{apiUrl}}/api/authors`

- Crear autor: `POST {{apiUrl}}/api/authors`

  - `name`: Nombre del autor
  - `country`: País de origen del autor

- Obtener un autor: `GET {{apiUrl}}/api/authors/{{author}}`

- Actualizar autor: `PUT {{apiUrl}}/api/authors/{{author}}`

  - `name`: Nombre del autor
  - `country`: País de origen del autor

- Eliminar un autor: `DELETE {{apiUrl}}/api/authors/{{author}}`

## Libros

Las rutas para obtener los libros:

- Listar libros: `GET {{apiUrl}}/api/books`

- Crear libro: `POST {{apiUrl}}/api/books`

  - `title`: Título del libro

- Obtener un libro: `GET {{apiUrl}}/api/books/{{book}}`

- Actualizar libro: `PUT {{apiUrl}}/api/books/{{book}}`

  - `title`: Título del libro

- Eliminar un libro: `DELETE {{apiUrl}}/api/books/{{book}}`
