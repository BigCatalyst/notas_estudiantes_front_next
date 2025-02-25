"use client";

import React, { useState } from "react";
import Section from "./Section";
import { BiPlusCircle } from "react-icons/bi";
import { useEffect } from "react";

export interface SectionType {
  title: string;
  description: string;
  indice: number;
}

const EdicionAulaVirtual: React.FC = () => {
  const [sections, setSections] = useState<SectionType[]>([]);

  useEffect(() => {
    localStorage.setItem("total_sections", "");
  }, []);

  useEffect(() => {
    localStorage.setItem("total_sections", sections.length + "");
    console.log(sections);
    console.log(localStorage.getItem("total_sections"));
  }, [sections]);

  const addSection = () => {
    let res: SectionType[] = [];

    res = [
      ...sections,
      { title: "New Section", description: "", indice: sections.length },
    ];

    res = res.sort((a, b) => (a.indice < b.indice ? 1 : -1));

    setSections(res);
  };

  const deleteSection = (index: number) => {
    // setSections(sections.filter((_, i) => i !== index));
    let cont = 0;
    let res: SectionType[] = [];
    sections.reverse().map((val, i) => {
      if (val.indice !== index) {
        res.push({ ...val, indice: cont++ });
      }
    });

    res = res.sort((a, b) => (a.indice < b.indice ? 1 : -1));
    setSections(res);
  };

  const updateSection = (index: number, newSection: SectionType) => {
    setSections(
      sections.map((section, i) => (i === index ? newSection : section))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Virtual Classroom Edition</h1>
      <button onClick={addSection} className="btn1">
        <span className="inline-flex items-center justify-center gap-1">
          <BiPlusCircle className="w-5 h-5" /> Adicionar Sección
        </span>
      </button>

      {sections.map((section, index) => (
        <Section
          key={index + Date.now()} //detalle si un componente tiene un indice existente no se rerenderiza
          {...section}
          onDelete={() => deleteSection(section.indice)}
          onUpdate={(newSection) => updateSection(index, newSection)}
        />
      ))}
    </div>
  );
};

export default EdicionAulaVirtual;
