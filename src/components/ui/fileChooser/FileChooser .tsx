/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { uploadFile } from "@/actions/uploadFile";
import React, { FC, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";

interface FileChooserProps {
  setFileURL: React.Dispatch<React.SetStateAction<string>>;
}

const FileChooser: FC<FileChooserProps> = ({ setFileURL }) => {
  const newKey = Date.now();
  const [localFileName, setLocalFileName] = useState(
    "Ningún archivo seleccionado"
  );

  const handleFileChange = async (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("origin", window.location.origin);

      try {
        const result = await uploadFile(formData);
        setFileURL(result.file);
        setLocalFileName(result.fileName);
        console.log(result);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    } else {
      setLocalFileName("Ningún archivo seleccionado");
    }
  };

  return (
    <div className="flex items-start">
      <div className="flex items-center justify-center gap-3">
        <label
          htmlFor={newKey + ""}
          className="cursor-pointer bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 btn2"
        >
          <LuCircleFadingPlus /> File
        </label>
        <input
          id={newKey + ""}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="text-gray-700 text-center">{localFileName}</span>
      </div>
    </div>
  );
};

export default FileChooser;
