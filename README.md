# dwec-react-task-list-example

Proyecto de ejemplo para **aprender React consumiendo una API** (peticiones HTTP y CRUD básico) en un entorno moderno.

La app se ejecuta con **Vite** y realiza llamadas a una API REST simulada usando **Axios**. Para el backend de prácticas se utiliza **json-server** con el fichero **`db.json`** incluido en el repositorio. :contentReference[oaicite:1]{index=1}

---

## Objetivo didáctico

- Practicar **componentes**, **estado**, **props** y flujo de datos.
- Aprender a **consumir una API REST** desde React (GET/POST/PUT/PATCH/DELETE).
- Entender la separación **frontend (React)** / **backend simulado (json-server)**.
- Familiarizarse con el flujo de trabajo típico con **Vite**.

---

## Tecnologías

- React + TypeScript
- Vite (dev server y build)
- Axios (HTTP client)
- json-server (API REST falsa a partir de un JSON)
- ESLint (configuración de linting)

---

## Requisitos

- Node.js (recomendado: versión LTS)
- npm (incluido con Node.js)

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sambrista/dwec-react-task-list-example.git
   cd dwec-react-task-list-example
````

2. Instala dependencias:

   ```bash
   npm install
   ```

---

## Levantar la API (json-server)

Este proyecto incluye el fichero `db.json` en la raíz. ([GitHub][1])

### Opción A: usar json-server con npx (recomendado para clase)

```bash
npx json-server --watch db.json --port 3001
```

* API disponible en: `http://localhost:3001`
* Los recursos disponibles dependen de las claves de `db.json` (por ejemplo: `/tasks`, `/todos`, etc.).
  Consejo: abre `db.json` y fíjate en el nombre del array principal para saber el endpoint exacto.

### Opción B: instalar json-server globalmente

```bash
npm i -g json-server
json-server --watch db.json --port 3001
```

---

## Levantar el frontend (React + Vite)

En otra terminal:

```bash
npm run dev
```

Por defecto, Vite suele servir en:

* `http://localhost:5173`

---

## Orden recomendado de ejecución

1. Terminal 1 (API):

   ```bash
   npx json-server --watch db.json --port 3001
   ```

2. Terminal 2 (frontend):

   ```bash
   npm run dev
   ```

---

## Configuración de la URL de la API

Si la aplicación no carga datos, revisa dónde está configurada la **base URL** de Axios (normalmente en algún fichero de `src/`).

Valores típicos:

* `http://localhost:3001`

Asegúrate de que:

* El puerto coincide con el que usas al arrancar `json-server`.
* El endpoint coincide con el recurso definido en `db.json`.

---

## Scripts habituales

Los scripts exactos están definidos en `package.json`. ([GitHub][1])
Los más comunes en proyectos Vite suelen ser:

* `npm run dev` — entorno de desarrollo
* `npm run build` — build de producción
* `npm run preview` — previsualización del build

---

## Estructura del proyecto (alto nivel)

* `src/` — código React (componentes, hooks, servicios de API, etc.) ([GitHub][1])
* `public/` — assets públicos ([GitHub][1])
* `db.json` — “base de datos” para json-server ([GitHub][1])

---

## Problemas típicos y solución rápida

* **CORS / errores de red**: asegúrate de tener `json-server` arrancado antes que el frontend y revisa la URL/puerto.
* **No aparece ningún listado**: confirma el endpoint (nombre del recurso) mirando `db.json`.
* **Puerto ocupado**:

  * Cambia el puerto de json-server: `--port 3002`
  * O cambia el de Vite si fuera necesario: `npm run dev -- --port 5174`
