"use server";

import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  //const uploadDir = path.join(process.cwd(), "public", "uploads");
  const uploadDir = path.join(process.cwd(), "uploads");

  // Verifica si el directorio existe, si no, créalo
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const fileNameArr = file.name.split(".");
  const ext = "." + fileNameArr[fileNameArr.length - 1];
  const fileName = Date.now() + ext;

  const filePath = path.join(uploadDir, fileName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Guardar el archivo en el sistema de archivos
  writeFileSync(filePath, buffer);

  return {
    message: "Archivo subido exitosamente",
    file: formData.get("origin") + `/uploads/${fileName}`,
    fileName: fileName,
  };
}
