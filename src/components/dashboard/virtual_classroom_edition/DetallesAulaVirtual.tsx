"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { SectionType } from "./Types";
import ApiService from "@/services/ApiService";
import { redirect, useParams, usePathname } from "next/navigation";
import { SubjectGet } from "@/services/api/subjects";
import { LuCircleFadingPlus } from "react-icons/lu";
import { BiCheckCircle, BiDownload, BiSend } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import Buttom from "@/components/ui/buttom/Buttom";

const DetallesAulaVirtual = () => {
  const { id } = useParams<{ id: string }>();
  const [sections, setSections] = useState<SectionType[]>([]);
  const [subject, setSubject] = useState<SubjectGet | null>(null);

  const url = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.subject_section_create_data(id);
        if (res) {
          console.log(res);
          setSections(res);
        }

        const res1 = await ApiService.getSubject(id);
        if (res1) {
          console.log(res1);
          setSubject(res1);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="p-4 text-gray-700">
      <h1 className="text-2xl font-bold mb-4">Detalles del Aula Virtual</h1>
      {/* <button className="btn1">
        <span className="inline-flex items-center justify-center gap-1">
          <LuCircleFadingPlus className="w-5 h-5" /> Salvar Cambios
        </span>
      </button> */}

      <div className="w-full mx-auto py-7 px-7 bg-white rounded-lg shadow-md relative mt-7 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800  py-1">
          Detalles de la Asignatura
        </h2>

        <div className="absolute left-0 w-full bg-gray-300 h-1"></div>

        <div className="flex flex-col gap-1.5 mt-7">
          <div className="inline-flex gap-1">
            <p className="font-bold">Nombre:</p>
            <p>{subject?.name}</p>
          </div>
          <div className="inline-flex gap-1">
            <p className="font-bold">Grado:</p>
            <p>
              {subject?.grade === "7"
                ? "7mo"
                : subject?.grade === "8"
                ? "8vo"
                : "9no"}
            </p>
          </div>
          <div className="inline-flex gap-1 items-center">
            <p className="font-bold">Tiene TCP2:</p>
            <p>
              {subject?.tcp2_required ? (
                <BiCheckCircle className="text-green-700 w-5 h-5" />
              ) : (
                <IoCloseCircle className="text-red-700 w-5 h-5" />
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="font-bold">Listado de Profesores:</p>
            <div className="grid md:grid-cols-2 mt-3">
              {subject?.professor.map((val, index) => (
                <div
                  key={index + Date.now()}
                  className="flex flex-col border-t-3 border-t-gray-700 shadow-lg bg-white px-2 py-3 rounded-b-md"
                >
                  <div className="inline-flex gap-1 ">
                    <p className="font-bold">Nombre del Profesor:</p>
                    <p>{val.first_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secciones */}
      {sections.map((section, index) => (
        <div
          key={index + Date.now()}
          className="w-full mx-auto py-7 px-7 bg-white rounded-lg shadow-md relative mt-7 space-y-4"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 text  py-1">
            {section.title}
          </h2>

          <div className="absolute left-0 h-1 bg-gray-300 w-full"></div>

          <p className="mt-7">{section.description}</p>

          <div className="w-full shadow-md p-3 bg-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-b-gray-300 py-1">
              Carpetas
            </h2>

            {/* Carpetas */}
            <div>
              {section.folders &&
                section.folders?.length > 0 &&
                section.folders?.map((folder, index) => (
                  <div
                    key={index + section.title + Date.now()}
                    className="p-3 shadow-md bg-white rounded-b-md border-t-3 border-b-gray-300
                    space-y-2 relative"
                  >
                    <p className="font-bold pb-1">{folder.title}</p>

                    <div className="w-full bg-gray-200 h-1 absolute left-0"></div>

                    <p className="mt-4">{folder.description}</p>

                    {/* Ficheros */}
                    <p className="font-bold pb-1 ">Recursos</p>

                    <div className="grid md:grid-cols-2 gap-2">
                      {folder.files?.map((file, index) => (
                        <div
                          key={index + section.title + Date.now()}
                          className="shadow-md bg-gray-100 p-3 space-y-3 relative"
                        >
                          <p className="font-bold">{file.title}</p>
                          <div className="absolute w-full h-1 bg-white left-0"></div>
                          <p className="mt-7">{file.description}</p>
                          <a href={file.file} className="btn2 bg-green-700">
                            <span className="inline-flex items-center gap-2">
                              <BiDownload className="w-5 h-5" /> Descargar
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full shadow-md p-3 bg-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-b-gray-300 py-1">
              Tareas
            </h2>

            {/* Tareas */}
            <div>
              {section.tasks &&
                section.tasks?.length > 0 &&
                section.tasks?.map((task, index) => (
                  <div
                    key={index + Date.now()}
                    className="p-3 shadow-md bg-white rounded-b-md border-t-3 border-b-gray-300
                    space-y-2 relative"
                  >
                    <p className="font-bold pb-1">{task.title}</p>
                    <div className="w-full bg-gray-200 h-1 absolute left-0"></div>
                    <p className="mt-4">{task.description}</p>
                    {/* Ficheros */}
                    <p className="font-bold pb-1 ">Recursos</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {task.files?.map((file, index) => (
                        <div
                          key={index + section.title + Date.now()}
                          className="shadow-md bg-gray-100 p-3 space-y-3 relative"
                        >
                          <p className="font-bold">{file.title}</p>
                          <div className="absolute w-full h-1 bg-white left-0"></div>
                          <p className="mt-7">{file.description}</p>
                          <a href={file.file} className="btn2 bg-green-700">
                            <span className="inline-flex items-center gap-2">
                              <BiDownload className="w-5 h-5" /> Descargar
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn1"
                      onClick={() => {
                        localStorage.setItem(
                          "detailsUrlCR",
                          JSON.stringify({ url: url })
                        );
                        redirect(
                          `/dashboard/virtual_classroom/student_task_response/${task.id}`
                        );
                      }}
                    >
                      <span className="inline-flex gap-1 items-center justify-center">
                        <BiSend /> Responder
                      </span>
                    </button>
                    {/* <Buttom
                      title="Responder"
                      to={`/dashboard/virtual_classroom/student_task_response/${task.id}`}
                      className="btn1"
                      icon={BiSend}
                      onClick={(e) => {
                        localStorage.setItem("detailsUrlCR", url);
                      }}
                    /> */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetallesAulaVirtual;
