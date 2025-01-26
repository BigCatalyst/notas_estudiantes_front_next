This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Estructura de archivos
```
my-next-app/
├── public/           # Archivos estáticos (imágenes, fuentes, etc.)
│   └── ...
├── src/
│   ├── components/    # Componentes reutilizables de la UI
│   │   ├── forms/      # Componentes específicos para formularios
│   │   │   ├── MyForm.tsx
│   │   │   └── ...
│   │   ├── ui/        # Componentes genéricos de la interfaz (botones, inputs, etc.)
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   └── ...
│   ├── hooks/        # Hooks personalizados
│   │   └── useMyData.ts
│   ├── pages/        # Páginas de la aplicación (rutas)
│   │   ├── _app.tsx    # Componente _app para configuración global
│   │   ├── _document.tsx # Componente _document para configuración de HTML
│   │   ├── index.tsx   # Página principal
│   │   └── [slug].tsx # Página dinámica (ejemplo)
│   │   └── ...
│   ├── styles/       # Estilos globales y de componentes
│   │   ├── globals.css  # Estilos globales
│   │   └── ...
│   ├── services/      # Lógica de comunicación con la API
│   │   ├── api.ts     # Configuración de axios y funciones de la API
│   │   └── ...
│   ├── utils/        # Funciones y utilidades
│   │   ├── validation.ts # Esquemas de validación con Zod
│   │   └── ...
│   ├── types/         # Definiciones de tipos
│   │    └── index.ts   # Definiciones de tipos para la app
│   ├── layouts/      # Estructura de diseño
│        └── MainLayout.tsx
│   ├── config/        # Variables de configuracion
│        └── index.ts
│   ├── context/        # Contextos para la app
│        └── AuthContext.tsx
│   └── ...
├── next.config.js   # Configuración de Next.js
├── package.json
├── tsconfig.json     # Configuración de TypeScript
└── ...
```




---

# Convenciones de Nombres en el Proyecto

Este documento describe las convenciones de nombres utilizadas en el proyecto para mantener un código limpio, consistente y fácil de entender.

---

## 1. Nombres de Archivos y Carpetas

- **kebab-case**: Usa guiones (`-`) para separar palabras. Esto es común en el ecosistema JavaScript.
  - Ejemplo: `my-component.tsx`, `user-profile.tsx`, `api-service.ts`.
  - Ejemplo de carpeta: `components/user-cards`.

- **Plural para carpetas**: Si una carpeta contiene varios archivos del mismo tipo, usa nombres en plural.
  - Ejemplo: `components/forms`, `hooks`, `services`.

- **Nombres cortos y descriptivos**: Asegúrate de que los nombres sean fáciles de entender.
  - Ejemplo: `auth-service.ts`, `user-profile.tsx`.

---

## 2. Nombres de Componentes React

- **PascalCase**: Usa la primera letra de cada palabra en mayúscula, sin espacios.
  - Ejemplo: `UserProfile`, `ProductCard`, `LoginForm`.

- **Nombres descriptivos**: El nombre del componente debe indicar claramente su propósito.
  - Ejemplo: `Header`, `Footer`, `Sidebar`.

- **Sufijos para tipos de componentes**: Si tienes componentes de diferentes tipos, usa sufijos.
  - Ejemplo: `MainLayout`, `ModalComponent`.

---

## 3. Nombres de Hooks Personalizados

- **use + PascalCase**: Comienza el nombre del hook con `use` seguido del nombre en PascalCase.
  - Ejemplo: `useFetchData`, `useFormState`, `useAuth`.

- **Nombres descriptivos**: El nombre del hook debe indicar qué hace.
  - Ejemplo: `useUserData`, `useThemeToggle`.

---

## 4. Nombres de Funciones

- **camelCase**: Usa la primera palabra en minúscula y la primera letra de las siguientes palabras en mayúscula, sin espacios.
  - Ejemplo: `handleFormSubmit`, `fetchUserData`, `validateEmail`.

- **Nombres descriptivos**: El nombre de la función debe indicar claramente su acción.
  - Ejemplo: `calculateTotalPrice`, `sendNotification`.

- **Verbos al inicio**: Usualmente, las funciones realizan acciones, así que empieza el nombre con un verbo.
  - Ejemplo: `getUserInfo`, `updateProfile`.

---

## 5. Nombres de Variables y Constantes

- **camelCase para variables**:
  - Ejemplo: `userName`, `isLoggedIn`, `productPrice`.

- **UPPER_CASE_SNAKE_CASE para constantes**:
  - Ejemplo: `API_URL`, `MAX_ITEMS`, `DEFAULT_PAGE_SIZE`.

- **Nombres descriptivos**: Evita abreviaciones poco claras.
  - Ejemplo: `maxRetryAttempts`, `initialLoadingState`.

- **Tipos explícitos en TypeScript**: Especifica los tipos de tus variables y constantes.
  - Ejemplo: `const user: User = { name: 'John' };`.

---

## 6. Nombres de Tipos e Interfaces

- **PascalCase**: Usa la primera letra de cada palabra en mayúscula.
  - Ejemplo: `User`, `Product`, `ApiResponse`.

- **Sufijos para distinguir**: Si es necesario, agrega sufijos para distinguir entre tipos e interfaces.
  - Ejemplo: `UserType`, `UserInterface`.

---

## 7. Nombres de Enums

- **PascalCase**: Usa la primera letra de cada palabra en mayúscula.
  - Ejemplo: `OrderStatus`, `UserRole`.

- **Miembros del enum en UPPER_CASE_SNAKE_CASE**:
  - Ejemplo: `OrderStatus.PENDING`, `UserRole.ADMIN`.

---

## 8. Nombres de Variables de Entorno

- **UPPER_CASE_SNAKE_CASE**: Usa letras mayúsculas y guiones bajos.
  - Ejemplo: `NEXT_PUBLIC_API_URL`, `DATABASE_URL`.

- **Prefijo para variables públicas**: Si tu variable es del lado del cliente, usa `NEXT_PUBLIC_` al inicio.
  - Ejemplo: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`.

---

## 9. Nombres de Clases CSS (Si usas CSS Modules o Similar)

- **kebab-case**: Utiliza guiones (`-`) para separar palabras.
  - Ejemplo: `.user-card`, `.form-input`, `.header-title`.

- **Nombres descriptivos**: Evita nombres genéricos como `.container` o `.item` si es posible.
  - Ejemplo: `.primary-button`, `.error-message`.

---

## Resumen

| Tipo                     | Convención               | Ejemplo                     |
|--------------------------|--------------------------|-----------------------------|
| Archivos y Carpetas       | kebab-case               | `user-profile.tsx`          |
| Componentes React         | PascalCase               | `UserProfile`               |
| Hooks Personalizados      | use + PascalCase         | `useFetchData`              |
| Funciones                 | camelCase                | `handleFormSubmit`          |
| Variables                 | camelCase                | `userName`                  |
| Constantes                | UPPER_CASE_SNAKE_CASE    | `API_URL`                   |
| Tipos e Interfaces        | PascalCase               | `UserType`                  |
| Enums                     | PascalCase               | `OrderStatus`               |
| Variables de Entorno      | UPPER_CASE_SNAKE_CASE    | `NEXT_PUBLIC_API_URL`       |
| Clases CSS                | kebab-case               | `.user-card`                |

---

Con estas convenciones, el código será más consistente, fácil de leer y mantener. 😊