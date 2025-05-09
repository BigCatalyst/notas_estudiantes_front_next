// provinciasCuba.ts

interface Provincia {
  [key: string]: string[];
}

const provinciasCuba: Provincia = {
  "Santiago de Cuba": [
    "Contramaestre",
    "Guamá",
    "Mella",
    "Palma Soriano",
    "San Luis",
    "Santiago de Cuba",
    "Segundo Frente",
    "Songo - La Maya",
    "Tercer Frente",
  ],
  Granma: [
    "Bartolomé Masó",
    "Bayamo",
    "Buey Arriba",
    "Campechuela",
    "Cauto Cristo",
    "Guisa",
    "Jiguaní",
    "Manzanillo",
    "Media Luna",
    "Niquero",
    "Pilón",
    "Río Cauto",
    "Yara",
  ],
  Cienfuegos: [
    "Abreus",
    "Aguada de Pasajeros",
    "Cienfuegos",
    "Cruces",
    "Cumanayagua",
    "Lajas",
    "Palmira",
    "Rodas",
  ],
  "Pinar del Río": [
    "Consolación del Sur",
    "Guane",
    "La Palma",
    "Los Palacios",
    "Mantua",
    "Minas de Matahambre",
    "Pinar del Río",
    "Sandino",
    "San Juan y Martínez",
    "San Luís",
    "Viñales",
  ],
  Artemisa: [
    "Alquízar",
    "Artemisa",
    "Bahía Honda",
    "Bauta",
    "Caimito",
    "Candelaria",
    "Guanajay",
    "Güira de Melena",
    "Mariel",
    "San Antonio de los Baños",
    "San Cristóbal",
  ],
  "La Habana": [
    "Arroyo Naranjo",
    "Boyeros",
    "Centro Habana",
    "Cerro",
    "Cotorro",
    "Diez de Octubre",
    "Guanabacoa",
    "La Habana del Este",
    "La Habana Vieja",
    "La Lisa",
    "Marianao",
    "Playa",
    "Plaza de la Revolución",
    "Regla",
    "San Miguel del Padrón",
  ],
  Mayabeque: [
    "Batabanó",
    "Bejucal",
    "Güines",
    "Jaruco",
    "Madruga",
    "Melena del Sur",
    "Nueva Paz",
    "Quivicán",
    "San José de las Lajas",
    "San Nicolás",
    "Santa Cruz del Norte",
  ],
  "Las Tunas": [
    "Amancio",
    "Colombia",
    "Jesús Menéndez",
    "Jobabo",
    "Las Tunas",
    "Majibacoa",
    "Manatí",
    "Puerto Padre",
  ],
  Matanzas: [
    "Calimete",
    "Cárdenas",
    "Ciénaga de Zapata",
    "Colón",
    "Jagüey Grande",
    "Jovellanos",
    "Limonar",
    "Los Arabos",
    "Martí",
    "Matanzas",
    "Pedro Betancourt",
    "Perico",
    "Unión de Reyes",
  ],
  "Villa Clara": [
    "Caibarién",
    "Camajuaní",
    "Cifuentes",
    "Corralillo",
    "Encrucijada",
    "Manicaragua",
    "Placetas",
    "Quemado de Güines",
    "Ranchuelo",
    "Remedios",
    "Sagua la Grande",
    "Santa Clara",
    "Santo Domingo",
  ],
  "Sancti Spíritus": [
    "Cabaiguán",
    "Fomento",
    "Jatibonico",
    "La Sierpe",
    "Sancti Spíritus",
    "Taguasco",
    "Trinidad",
    "Yaguajay",
  ],
  "Isla de la Juventud": ["Isla de la Juventud"],
  Holguín: [
    "Antilla",
    "Báguanos",
    "Banes",
    "Cacocum",
    "Calixto García",
    "Cueto",
    "Frank País",
    "Gibara",
    "Holguín",
    "Mayarí",
    "Moa",
    "Rafael Freyre",
    "Sagua de Tánamo",
    "Urbano Noris",
  ],
  "Ciego de Ávila": [
    "Baraguá",
    "Bolivia",
    "Chambas",
    "Ciego de Ávila",
    "Ciro Redondo",
    "Florencia",
    "Majagua",
    "Morón",
    "Primero de Enero",
    "Venezuela",
  ],
  Camagüey: [
    "Camagüey",
    "Carlos Manuel de Céspedes",
    "Esmeralda",
    "Florida",
    "Guáimaro",
    "Jimaguayú",
    "Minas",
    "Najasa",
    "Nuevitas",
    "Santa Cruz del Sur",
    "Sibanicú",
    "Sierra de Cubitas",
    "Vertientes",
  ],
  Guantánamo: [
    "Baracoa",
    "Caimanera",
    "El Salvador",
    "Guantánamo",
    "Imías",
    "Maisí",
    "Manuel Tames",
    "Niceto Pérez",
    "San Antonio del Sur",
    "Yateras",
  ],
};

export const getMunicipios = (provincia: string): string[] | undefined => {
  return provinciasCuba[provincia];
};

export const listarProvincias = (): string[] => {
  return Object.keys(provinciasCuba);
};

export default provinciasCuba;
