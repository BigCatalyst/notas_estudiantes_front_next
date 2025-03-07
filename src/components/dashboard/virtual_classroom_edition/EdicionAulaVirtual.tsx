/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";

import React, { useRef, useState } from "react";
import { SectionRef } from "./Section";
import { useEffect } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import { ErrorRes, SectionType } from "./Types";
import { useParams, useRouter } from "next/navigation";
import ApiService from "@/services/ApiService";

const EdicionAulaVirtual: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [sections, setSections] = useState<SectionType[]>([]);

  const childRefs = useRef<{ [key: string]: any }>({});

  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("total_sections", sections.length + "");
  }, [sections]);

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.subject_section_create_data(id);
        if (res) {
          setSections(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function extractErrorsWithPath(data: any, path = "", errors: string[] = []) {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const currentPath = path ? `${path}[${index}]` : `[${index}]`;
        if (Array.isArray(item) || typeof item === "object") {
          extractErrorsWithPath(item, currentPath, errors);
        } else if (typeof item === "string") {
          errors.push(`${currentPath}: ${item}`);
        }
      });
    } else if (typeof data === "object" && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (Array.isArray(value)) {
          if (value.every((msg) => typeof msg === "string")) {
            value.forEach((msg) => {
              errors.push(`${currentPath}: ${msg}`);
            });
          } else {
            extractErrorsWithPath(value, currentPath, errors);
          }
        } else if (typeof value === "object") {
          extractErrorsWithPath(value, currentPath, errors);
        }
      });
    }
    return errors;
  }

  const salvarCambios = () => {
    setError([]);
    if (childRefs.current) {
      let dataupdate: SectionType[] = [];

      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a });
        }
      });

      console.log(dataupdate);
      setSections([...dataupdate]);

      (async () => {
        try {
          const res = await ApiService.subject_section_create_Add(
            id,
            dataupdate
          );

          if (res) router.push("/dashboard/virtual_classroom");
        } catch (error: any) {
          console.log(error);

          const errorRes: ErrorRes[] = error.response.data;

          const errorData: string[] = [];

          errorRes.forEach((er, index) => {
            const indexSection = index;
            if (er && er.title) {
              errorData.push(
                `Título de la Sección ${indexSection + 1}: ${er.title.join(
                  ", "
                )}`
              );

              if (er.folders) {
                er.folders.forEach((f, index) => {
                  const indexFolder = index;
                  if (f && f.title) {
                    errorData.push(
                      `Título de la Carpeta ${indexFolder + 1} de la Sección ${
                        indexSection + 1
                      }: ${f.title.join(", ")}`
                    );

                    if (f.files && f.files.length > 0) {
                      f.files.forEach((file, index) => {
                        const indexFileFolder = index;
                        if (file && file.title) {
                          errorData.push(
                            `Título del Fichero ${
                              indexFileFolder + 1
                            } de la Carpeta ${indexFolder + 1} de la Sección ${
                              indexSection + 1
                            }: ${file.title.join(", ")}`
                          );
                        }

                        if (file && file.file) {
                          errorData.push(
                            `Dirección del Fichero ${
                              indexFileFolder + 1
                            } de la Carpeta ${indexFolder + 1} de la Sección ${
                              indexSection + 1
                            }: ${file.file.join(", ")}`
                          );
                        }
                      });
                    }
                  }
                });
              }

              if (er.tasks) {
                er.tasks.forEach((t, index) => {
                  const indexTasks = index;
                  if (t && t.title) {
                    errorData.push(
                      `Título de la Tarea ${indexTasks + 1} de la Sección ${
                        indexSection + 1
                      }: ${t.title.join(", ")}`
                    );

                    if (t.files && t.files.length > 0) {
                      t.files.forEach((file, index) => {
                        const indexFileFolder = index;
                        if (file && file.title) {
                          errorData.push(
                            `Título del Fichero ${
                              indexFileFolder + 1
                            } de la Tarea ${indexTasks + 1} de la Sección ${
                              indexSection + 1
                            }: ${file.title.join(", ")}`
                          );
                        }

                        if (file && file.file) {
                          errorData.push(
                            `Dirección del Fichero ${
                              indexFileFolder + 1
                            } de la Tarea ${indexTasks + 1} de la Sección ${
                              indexSection + 1
                            }: ${file.file.join(", ")}`
                          );
                        }
                      });
                    }
                  }
                });
              }
            }
          });

          setError(errorData);
        }
      })();
    }
  };

  const addSection = () => {
    let dataupdate: SectionType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key, index) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a, index: index });
        }
      });
    }

    let res: SectionType[] = [];

    res = [
      ...dataupdate,
      {
        title: "New Section",
        description: "",
        index: dataupdate.length,
        folders: [],
      },
    ];

    console.log(res);

    setSections(res);
  };

  const deleteSection = (indexPos: number) => {
    let dataupdate: SectionType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key, index) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a, index: index });
        }
      });
    }
    let count = 0;
    let res: SectionType[] = [];
    dataupdate.map(
      (val, index) => index !== indexPos && res.push({ ...val, index: count++ })
    );

    setSections(res);
  };

  const onIndexDown = (index: number) => {
    let dataupdate: SectionType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a });
        }
      });
    }

    const indiceActual = index;
    const indiceAnterior = index + 1;

    console.log(dataupdate);

    if (dataupdate && dataupdate.length > 0) {
      const actual: SectionType = dataupdate[indiceActual];
      const anterior: SectionType = dataupdate[indiceAnterior];

      actual.index++;
      if (anterior) anterior.index--;
    }

    const res = dataupdate.map((val) => val);
    setSections(res);
  };

  const onIndexUp = (index: number) => {
    let dataupdate: SectionType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a });
        }
      });
    }

    const indiceActual = index;
    const indiceSiguiente = index - 1;

    const actual: SectionType = dataupdate[indiceActual];
    const siguiente: SectionType = dataupdate[indiceSiguiente];

    actual.index--;
    if (siguiente) siguiente.index++;

    const res = dataupdate.map((val) => val);

    setSections(res);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edición del Aula Virtual</h1>
      <button onClick={addSection} className="btn1">
        <span className="inline-flex items-center justify-center gap-1">
          <LuCircleFadingPlus className="w-5 h-5" /> Adicionar Sección
        </span>
      </button>

      <button onClick={salvarCambios} className="btn1">
        <span className="inline-flex items-center justify-center gap-1">
          <LuCircleFadingPlus className="w-5 h-5" /> Salvar Cambios
        </span>
      </button>

      {/* {error.length > 0 && (
        <div className="w-full flex flex-col">
          {error.map((val: string[], index) => (
            <div
              key={index + Date.now()}
              className="shadow-lg rounded-lg p-7 mt-7 bg-red-500 text-white"
            >
              <p>Sección {index + 1}</p>
              {val.map((val1, index) => (
                <div key={index + Date.now()}>
                  {index === 0 &&
                    val1.split(":")[0] === "title" &&
                    `Título de Sección: ${val1.split(":")[1]}`}

                  {val1.split(":")[0].includes("folders") &&
                    val1.split(":")[0].includes("title") &&
                    !val1.split(":")[0].includes("files") &&
                    `Título de la Carpeta ${
                      Number(val1.split(":")[0].split("[")[1].split("]")[0]) + 1
                    }:  ${val1.split(":")[1]}`}
                </div>
              ))}
            </div>
          ))}
        </div>
      )} */}

      {error.length > 0 && (
        <div className="w-full flex flex-col mt-7 bg-red-500 rounded-lg">
          {error.map((err, index) => (
            <div key={index + Date.now()} className="shadow-sm text-white p-3">
              <p>{err}</p>
            </div>
          ))}
        </div>
      )}

      {sections
        .sort((a, b) => (a.index > b.index ? 1 : -1))
        .map((section, index) => (
          <SectionRef
            key={index + Date.now()}
            {...section}
            onDelete={() => deleteSection(index)}
            onIndexDown={() => onIndexDown(section.index)}
            onIndexUp={() => onIndexUp(section.index)}
            ref={(el: any) => (childRefs.current[`child-${index}`] = el)}
          />
        ))}
    </div>
  );
};

export default EdicionAulaVirtual;
