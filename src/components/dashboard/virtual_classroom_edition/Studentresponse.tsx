"use client";

import Buttom from "@/components/ui/buttom/Buttom";
import { SectionResponseRes } from "@/services/api/virtual_classroom_edition";
import ApiService from "@/services/ApiService";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const StudentResponse = () => {
  const { idResponse } = useParams<{ idResponse: string }>();

  const [data, setData] = useState<SectionResponseRes[] | undefined>();

  const url = useRef("");

  const path = usePathname();

  useEffect(() => {
    const pathArray = path.split("/");
    const res: string[] = [];
    for (let index = 0; index < pathArray.length - 2; index++) {
      res.push(pathArray[index]);
    }
    console.log(res.join("/"));
    url.current = res.join("/");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.subject_section_responses(idResponse);
        if (res) {
          console.log(res);
          setData(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="relative">
      <Buttom
        title="Edición de Aula virtual"
        className="btn1 mb-7"
        icon={IoIosArrowBack}
        to={url.current}
      />

      {data &&
        data?.map((res, index) => (
          <div key={index}>
            <div className="w-full bg-white p-7 shadow-md rounded-lg flex flex-col gap-2">
              <div className="inline-flex gap-3">
                <p className="font-bold">Nombre del Estudiante:</p>
                <span>{`${res.student.first_name} ${res.student.last_name}`}</span>
              </div>
              <div className="inline-flex gap-3">
                <p className="font-bold">CI del Estudiante:</p>
                <span>{res.student.ci}</span>
              </div>
              <div className="inline-flex gap-3">
                <p className="font-bold">Grado del Estudiante:</p>
                <span>
                  {res.student.grade === 9
                    ? "9no"
                    : res.student.grade === 8
                    ? "8vo"
                    : "7mo"}
                </span>
              </div>
              <div className="inline-flex gap-3">
                <p className="font-bold">Descripción de la Respuesta:</p>
                <span>{res.description}</span>
              </div>

              <div className="mt-2 p-3 shadow-md bg-gray-100">
                <p className="font-bold mb-2">Lista de Archivos:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {res.files.length > 0 &&
                    res.files.map((file, index) => (
                      <div key={index} className="p-3 shadow-md bg-white">
                        <div className="inline-flex gap-3">
                          <p className="font-bold">Título del Archivo:</p>
                          <span>{file.title}</span>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold">Descripción del Archivo:</p>
                          <span>{file.description}</span>
                        </div>
                        <a
                          className="mt-2 btn2 bg-green-800 hover:bg-green-700"
                          href={file.file}
                          target="_blank"
                        >
                          Descargar
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StudentResponse;
