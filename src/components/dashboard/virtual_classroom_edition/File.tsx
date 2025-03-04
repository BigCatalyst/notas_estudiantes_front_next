/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FileType } from "./Types";
import { MdDeleteForever } from "react-icons/md";
import FileChooser from "@/components/ui/fileChooser/FileChooser ";

interface FileProps extends FileType {
  onDelete?: () => void;
  ref?: any;
}

export const FileRef = forwardRef((props: FileProps, ref) => (
  <File {...props} ref={ref} />
));

const File: React.FC<FileProps> = ({
  id,
  title,
  description,
  file,
  onDelete,
  ref,
}) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [fileURL, setFileURL] = useState<string>(file ? file : "");

  useImperativeHandle(ref, () => ({
    getData() {
      return {
        id: id,
        title: localTitle,
        description: localDescription,
        file: fileURL,
      };
    },
  }));

  return (
    <div className="w-full mx-auto py-7 px-7 bg-white rounded-lg shadow-md relative mt-7 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>

        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button onClick={onDelete} className="bg-red-800 hover:bg-red-700 btn2">
        <MdDeleteForever />
        Eliminar
      </button>
      {/* <input type="file" className="mt-2" /> */}

      <FileChooser setFileURL={setFileURL} />

      {fileURL && (
        <div className="flex flex-col">
          <a href={fileURL} target="_blank" className="btn2 mt-2 bg-blue-800">
            <span>Descargar</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default File;
