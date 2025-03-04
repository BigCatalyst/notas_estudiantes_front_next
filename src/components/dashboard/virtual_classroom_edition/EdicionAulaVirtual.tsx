/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";

import React, { useRef, useState } from "react";
import { SectionRef } from "./Section";
import { useEffect } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import { SectionType } from "./Types";
import { useParams, useRouter } from "next/navigation";
import ApiService from "@/services/ApiService";

const EdicionAulaVirtual: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [sections, setSections] = useState<SectionType[]>([]);

  const childRefs = useRef<{ [key: string]: any }>({});

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

  const salvarCambios = () => {
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
        } catch (error) {
          console.log(error);
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
      <h1 className="text-2xl font-bold mb-4">Virtual Classroom Edition</h1>
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
