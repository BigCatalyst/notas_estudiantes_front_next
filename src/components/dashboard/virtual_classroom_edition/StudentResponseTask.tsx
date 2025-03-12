/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DataStudentResponseTask,
  ResponseTastRes,
} from "@/services/api/virtual_classroom_edition";
import ApiService from "@/services/ApiService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FileType } from "./Types";
import { LuCircleFadingPlus } from "react-icons/lu";
import File from "./File";
import { RiSave3Fill } from "react-icons/ri";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { IoIosArrowBack } from "react-icons/io";

export const StudentResponseTask = () => {
  const [task, setTask] = useState<ResponseTastRes | null>(null);

  const localDescription = useRef("");

  const { id } = useParams<{ id: string }>();

  const [files, setFiles] = useState<FileType[]>(
    task && task.files ? task.files : []
  );

  const router = useRouter();

  const childRefs = useRef<{ [key: string]: any }>({});

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await ApiService.student_response_task(id);
      if (res) {
        console.log(res);
        setTask(res);
        localDescription.current = res.description;
        setFiles(res.files);
      }
    })();
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

  const deleteFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const SalvarRespuesta = () => {
    let filesRef: FileType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          let a = childRefs.current[key].getData();
          filesRef.push(a);
        }
      });
    }

    if (task?.id) {
      //update
      console.log("Update");
      const data: DataStudentResponseTask = {
        description: localDescription.current ? localDescription.current : "",
        files: filesRef,
        school_task: task?.school_task,
        student: task?.student.id,
      };

      console.log(data);

      (async () => {
        try {
          const res = await ApiService.update_student_response_task(
            task.id + "",
            data
          );
          if (res) {
            console.log(res);
            const st: any = localStorage.getItem("detailsUrlCR");
            const url = JSON.parse(st);
            if (url) router.push(url.url);
          }
        } catch (error) {
          console.log(error);
          setError("Error al actualizar los datos");
        }
      })();
    } else if (localDescription && localDescription.current?.length > 0) {
      //add
      console.log("Add");
      const data: DataStudentResponseTask = {
        description: localDescription.current ? localDescription.current : "",
        files: filesRef,
        school_task: task?.school_task,
        student: task?.student.id,
      };

      console.log(data);

      (async () => {
        try {
          const res = await ApiService.add_student_response_task(data);
          if (res) {
            console.log(res);
            const st: any = localStorage.getItem("detailsUrlCR");
            const url = JSON.parse(st);
            if (url) router.push(url.url);
          }
        } catch (error) {
          console.log(error);
          setError("Error al crear los datos");
        }
      })();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <button className="btn1" onClick={SalvarRespuesta}>
        <span className="inline-flex gap-1 items-center justify-center">
          <RiSave3Fill /> Salvar Respuesta
        </span>
      </button>

      <button
        onClick={() => {
          const st: any = localStorage.getItem("detailsUrlCR");
          const url = JSON.parse(st);
          if (url) router.push(url.url);
        }}
        className="btn1"
      >
        <span className="inline-flex items-center justify-center gap-1">
          <IoIosArrowBack className="w-5 h-5" /> Detalles Aula Virtual
        </span>
      </button>

      {/* Mensajes de éxito o error */}
      {error && (
        <MessageForm
          isSuccess={error.length > 0}
          error={error.length === 0}
          errorMessage={error}
        />
      )}

      <div className="w-full mx-auto py-7 px-7 bg-white rounded-lg shadow-md relative mt-7 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            defaultValue={localDescription.current}
            onChange={(e) => {
              localDescription.current = e.target.value;
              console.log(localDescription.current);
            }}
            className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={addFile}
          className="bg-green-800 hover:bg-green-700 btn2"
        >
          <LuCircleFadingPlus />
          File
        </button>

        {files.length > 0 && (
          <div className="mt-7 shadow-md rounded-lg p-7 bg-gray-50">
            <h1 className="text-xl font-bold mb-4 text-gray-700 border-b-1 border-b-gray-300 w-full text-center pb-2">
              Ficheros
            </h1>
            <div className="grid  md:grid-cols-2 md:gap-3">
              {files.map((file, index) => (
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
    </div>
  );
};
