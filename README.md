# Lunare JOYERÍA
Sistema de catálogo web y panel de administración para una joyería, implementado con base de datos relacional en la nube y roles de usuario.

**Demo en vivo:** https://lunare-joyeria-nextjs-nine.vercel.app

## Capturas de pantalla
*(Las capturas del sistema en funcionamiento se presentarán en el video de sustentación)*

## Stack tecnológico
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos y Auth:** Supabase (PostgreSQL)
- **Despliegue:** Vercel
- **API Externa:** ExchangeRate API (Tasas de cambio)

## Roles de usuario
- **Administrador:** Tiene acceso al Panel de Control (Dashboard) protegido por middleware, donde puede visualizar, crear y gestionar el inventario del catálogo mediante Server Actions.
- **Cliente (Público):** Puede navegar por las rutas públicas, utilizar la barra de búsqueda interactiva (filtrado con useState) y ver las rutas dinámicas de los detalles de las joyas.

## Modelo de datos
La base de datos relacional en Supabase consta de 3 tablas conectadas:
1. `profiles`: Extiende la información de auth.users, almacenando el nombre completo y el rol (`admin` o `cliente`).
2. `joyas`: Almacena la información del catálogo (título, material, precio).
3. `categorias`: Tabla relacional para estructurar la clasificación de los productos.

## Instalación local
Para ejecutar este proyecto en tu propia máquina:
1. Clonar el repositorio: `git clone https://github.com/allanxito01-cyber/lunare-joyeria-nextjs`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: Crear un archivo `.env.local` en la raíz (no subir a GitHub) y agregar:
   - `NEXT_PUBLIC_SUPABASE_URL=tu_url`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key`
4. Iniciar el servidor: `npm run dev`

## Credenciales de prueba
Para revisión académica, utilizar las siguientes credenciales:
- **Usuario:** allangarcia01@hotmail.com
- **Contraseña:** allangarcia

## Autor
Allan Steeven Garcia Soledispa
ENLACE VIDEO: https://ister-my.sharepoint.com/:v:/g/personal/allan_garcia_ister_edu_ec/IQBRDjSeTqJPQozcAMHFojSrAcSysrpO4Jua0YAysgpn2tM?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=VlVpeX https://github.com/allanxito01-cyber/lunare-joyeria-nextjs 
