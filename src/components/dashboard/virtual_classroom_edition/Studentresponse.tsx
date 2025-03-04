"use client";

import { SectionResponseRes } from "@/services/api/virtual_classroom_edition";
import ApiService from "@/services/ApiService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const StudentResponse = () => {
  const { idResponse } = useParams<{ idResponse: string }>();

  const [data, setData] = useState<SectionResponseRes[] | undefined>();

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
    <div>
      {data &&
        data?.map((res, index) => (
          <div key={index}>
            <div className="w-full bg-white p-7 shadow-md rounded-lg flex flex-col gap-2">
              <div className="inline-flex gap-3">
                <p className="font-bold">Nombre del Estudiante:</p>
                <span>{res.student.first_name}</span>
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
                          <span>
                            {file.description}asdasdasdasdas asdas asd asd asd
                            asd asd sad dssa asd asd asd asd asd asd asdas d
                          </span>
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
