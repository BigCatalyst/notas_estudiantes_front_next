/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FileType, StudentResponseType, TaskType } from "./Types";
import { MdDeleteForever } from "react-icons/md";
import { LuCircleFadingPlus } from "react-icons/lu";
import File from "./File";
import { PiStudent } from "react-icons/pi";
import { redirect, usePathname } from "next/navigation";

interface TaskProps extends TaskType {
  onDelete: () => void;
  ref?: any;
}

export const TaskRef = forwardRef((props: TaskProps, ref) => (
  <Task {...props} ref={ref} />
));

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  onDelete,
  files,
  students_responses,
  ref,
}) => {
  const localTitle = useRef(title);
  const localDescription = useRef(description);
  const [files2, setFiles] = useState<FileType[]>(files ? files : []);
  const [students_responses2, setStudents_responses] = useState<
    StudentResponseType[] | undefined
  >(students_responses ? students_responses : []);

  const path = usePathname();

  const childRefs = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    console.log(students_responses2);
  }, []);

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

  const studentResponse = () => {
    redirect(`${path}/response/${id}`);
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
          Título de la Tarea
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

      {students_responses2 && students_responses2?.length > 0 && (
        <button
          onClick={studentResponse}
          className="bg-blue-800 hover:bg-blue-700 btn2"
        >
          <PiStudent />
          Respuesta Estudiante
        </button>
      )}

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

export default Task;
