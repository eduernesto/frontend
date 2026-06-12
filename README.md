# EcoSmart Dashboard

Dashboard IoT para el monitoreo en tiempo real del nivel de llenado de contenedores de basura inteligentes ("tachos"). Construido con **React 18 + Vite**.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## Características

- **Dashboard en vivo** — Visualiza el estado actual de todos los tachos con indicadores de llenado.
- **Historial de mediciones** — Consulta el registro cronológico de sensores con filtro por contenedor.
- **Estadísticas agregadas** — Tarjetas resumen con total de tachos, llenos y disponibles.
- **Indicadores visuales** — Barra de progreso con código de colores (verde/azul/amarillo/rojo) según el nivel de llenado.
- **Diseño responsive** — Adaptado a escritorio y dispositivos móviles (breakpoint 768px).
- **Carga esqueleto** — Skeleton loaders mientras se obtienen los datos.
- **Manejo de errores** — Estados de error con botón de reintento en cada componente.
- **Accesibilidad** — Roles ARIA, atributos `aria-*` y navegación por teclado.
- **Enrutamiento SPA** — Dos vistas principales mediante `react-router-dom`.

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| [React](https://react.dev/) | ^18.2.0 |
| [Vite](https://vitejs.dev/) | ^5.0.0 |
| [react-router-dom](https://reactrouter.com/) | ^6.20.0 |

---

## Estructura del Proyecto

```
ecosmart-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegación superior
│   │   ├── StatsCards.jsx      # Tarjetas de estadísticas
│   │   ├── ProgressBar.jsx     # Barra de progreso reutilizable
│   │   └── TachoCard.jsx       # Tarjeta individual de tacho
│   ├── pages/
│   │   ├── Estado.jsx          # Dashboard en tiempo real
│   │   └── Historial.jsx       # Historial de mediciones
│   ├── services/
│   │   └── api.js              # Cliente HTTP y utilidades
│   ├── styles/
│   │   └── index.css           # Estilos globales y sistema de diseño
│   ├── App.jsx                 # Componente raíz con rutas
│   └── main.jsx                # Punto de entrada de la aplicación
├── .env                        # Variables de entorno (NO versionar)
├── .env.example                # Plantilla de variables de entorno
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9 (incluido con Node.js)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/ecosmart-frontend.git
cd ecosmart-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend

# 4. Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base de la API REST del backend | `https://tu-backend.onrender.com/api` |

> **Nota:** El archivo `.env` contiene valores reales y **no debe versionarse**. Usa `.env.example` como plantilla.

---

## Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo (Vite)
npm run build    # Compila la aplicación para producción
npm run preview  # Previsualiza la build de producción localmente
```

---

## Despliegue

El proyecto incluye un archivo `vercel.json` para despliegue en [Vercel](https://vercel.com/):

```bash
npm run build      # Genera la carpeta dist/
vercel deploy      # Despliega en Vercel
```

Asegúrate de configurar la variable de entorno `VITE_API_URL` en el panel de Vercel.

---

## Licencia

MIT © EcoSmart
