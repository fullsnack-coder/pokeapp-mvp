# Proyecto App de Pokemon para prueba técnica

![demo image](https://i.imgur.com/QNFwoRx.png)

En esta app puedes buscar y filtrar los pokemons que desees además de visualizar los datos de un pokemon en específico en una pantalla detalle. Este proyecto implementa principios de arquitectura hexagonal para el frontend y vertical slicing. Se utilizan los módulos `shared` y `pokemon` para organizar el código. El módulo `shared` contiene componentes y funcionalidades compartidas, mientras que el módulo `pokemon` incluye componentes con lógica específica de la aplicación. Además, se usa `react-query` y `axios` para las peticiones a la API de Next.js de forma escalable, y la capa de API de Next.js actúa como backend for frontend, obteniendo datos de [PokeAPI](https://pokeapi.co/).

## Requisitos

- Node.js versión 18.17.0 o superior
- Yarn versión 1.22.22 o superior

## Estructura de Carpetas

- **/shared**: Contiene componentes y funcionalidades reutilizables en toda la aplicación.
- **/pokemon**: Incluye componentes y lógica específica de la aplicación relacionada con Pokémon.
- **/pages**: Contiene las páginas de Next.js.
- **/api**: Implementación del backend for frontend utilizando Next.js API routes.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```
3. Instala las dependencias:
   ```bash
   yarn
   ```

## Cómo correr la aplicación

1. Renombra el archivo `.env.example` a `.env.local`
2. Inicia el servidor de desarrollo:
   ```bash
   yarn dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## Cómo correr los tests

1. Ejecuta la bateria de pruebas
   ```bash
   yarn test
   ```

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Next.js**: Framework para aplicaciones React con renderizado del lado del servidor.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y responsivo.
- **React Query**: Librería para el manejo de estado de las peticiones a APIs.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **Cypress**: Framework para pruebas end-to-end.

## API

La aplicación obtiene datos desde [PokeAPI](https://pokeapi.co/) utilizando las rutas de API de Next.js para manejar las solicitudes y respuestas de manera escalable y eficiente.

## Arquitectura

### Arquitectura Hexagonal

La arquitectura hexagonal se implementa para separar la lógica de la aplicación del framework y de las interfaces de usuario, facilitando el mantenimiento y la escalabilidad del código.

### Vertical Slicing

El principio de vertical slicing se utiliza para dividir el código en módulos cohesivos, donde cada módulo contiene todo lo necesario para una funcionalidad específica, desde el front-end hasta el back-end.

## Video Demo

Para ver una demostración en video de la aplicación en funcionamiento, visita el siguiente enlace:

[Video DEMO](https://vimeo.com/980334346?share=copy)

---

¡Gracias por utilizar nuestro proyecto! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o un pull request.
