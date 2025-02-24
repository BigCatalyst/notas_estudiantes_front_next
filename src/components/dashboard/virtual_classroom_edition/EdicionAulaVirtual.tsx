"use client";

import React, { useState } from "react";
import Section from "./Section";

const EdicionAulaVirtual: React.FC = () => {
  const [sections, setSections] = useState<SectionType[]>([]);

  const addSection = () => {
    setSections([...sections, { title: "New Section", description: "" }]);
  };

  const deleteSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
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
        Adicionar Sección
      </button>

      {sections.map((section, index) => (
        <Section
          key={index}
          {...section}
          onDelete={() => deleteSection(index)}
          onUpdate={(newSection) => updateSection(index, newSection)}
        />
      ))}
    </div>
  );
};

export default EdicionAulaVirtual;

export interface SectionType {
  title: string;
  description: string;
}
