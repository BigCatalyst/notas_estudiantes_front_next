// config/index.ts
const API_URL_ENV=process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_URL = `${API_URL_ENV}/api/`
