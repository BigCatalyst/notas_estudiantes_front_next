/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import File, { FileRef } from "./File";
import { FileType, FolderType } from "./Types";
import { MdDeleteForever } from "react-icons/md";
import { LuCircleFadingPlus } from "react-icons/lu";

interface FolderProps extends FolderType {
  onDelete: () => void;
  ref?: any;
}

export const FolderRef = forwardRef((props: FolderProps, ref) => (
  <Folder {...props} ref={ref} />
));

const Folder: React.FC<FolderProps> = ({
  id,
  title,
  description,
  onDelete,
  files,
  ref,
}) => {
  const [files2, setFiles] = useState<FileType[]>(files ? files : []);
  const localTitle = useRef(title);
  const localDescription = useRef(description);

  const childRefs = useRef<{ [key: string]: any }>({});

  const addFile = () => {
    let filesRef: FileType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          let a = childRefs.current[key].getData();
          filesRef.push(a);
        }
      });
    }

    setFiles([
      ...filesRef,
      { file: "", description: "", title: "New File", fileName: "Select File" },
    ]);
  };

  useImperativeHandle(ref, () => ({
    getData() {
      let filesRef: FileType[] = [];
      if (childRefs.current) {
        Object.keys(childRefs.current).forEach((key) => {
          if (childRefs.current[key]?.getData) {
            let a = childRefs.current[key].getData();
            filesRef.push(a);
          }
        });
      }

      return {
        id: id,
        title: localTitle.current,
        description: localDescription.current,
        files: filesRef,
      };
    },
  }));

  const deleteFile = (index: number) => {
    setFiles(files2.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto py-7 px-7 bg-white rounded-lg shadow-md relative mt-7 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre de la Carpeta
        </label>

        <input
          type="text"
          defaultValue={title}
          onChange={(e) => (localTitle.current = e.target.value)}
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          defaultValue={description}
          onChange={(e) => (localDescription.current = e.target.value)}
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button onClick={onDelete} className="bg-red-800 hover:bg-red-700 btn2">
        <MdDeleteForever />
        Eliminar
      </button>
      <button
        onClick={addFile}
        className="bg-green-800 hover:bg-green-700 btn2"
      >
        <LuCircleFadingPlus />
        File
      </button>

      {files2.length > 0 && (
        <div className="mt-7 shadow-md rounded-lg p-7 bg-gray-50">
          <h1 className="text-xl font-bold mb-4 text-gray-700 border-b-1 border-b-gray-300 w-full text-center pb-2">
            Ficheros
          </h1>
          <div className="grid  md:grid-cols-2 md:gap-3">
            {files2.map((file, index) => (
              <File
                key={index + Date.now()}
                {...file}
                onDelete={() => deleteFile(index)}
                ref={(el: any) => (childRefs.current[`child-${index}`] = el)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
