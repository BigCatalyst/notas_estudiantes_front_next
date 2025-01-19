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