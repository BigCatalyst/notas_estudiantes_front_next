/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextRequest } from "next/server";
import { join } from "path";
import { statSync } from "fs";
import { readFile } from "fs/promises";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const file = (await params).name; // Ahora coincide con el nombre de la carpeta [names]

  const filePath = join(process.cwd(), "uploads", file);

  try {
    const fileStat = statSync(filePath); // Verifica si el archivo existe
    if (fileStat.isFile()) {
      const fileName = file.split("/").pop(); // Obtiene el nombre del archivo final
      const fileBuffer = await readFile(filePath); // Lee el archivo como Buffer

      return new Response(fileBuffer, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="${fileName}"`, // Fuerza la descarga
        },
      });
    } else {
      return new Response("Archivo no encontrado", { status: 404 });
    }
  } catch (error) {
    return new Response("Archivo no encontrado", { status: 404 });
  }
}
