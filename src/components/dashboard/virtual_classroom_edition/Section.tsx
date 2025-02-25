"use client";

import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import Task from "./Task";
import { SectionType } from "./EdicionAulaVirtual";
import { CgClose } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuCircleFadingPlus } from "react-icons/lu";
import { MdDeleteForever, MdEdit } from "react-icons/md";

interface SectionProps extends SectionType {
  onDelete: () => void;
  onUpdate: (newSection: SectionType) => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  indice,
  onDelete,
  onUpdate,
}) => {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localIndice, setLocalIndice] = useState(indice);
  const [totalSections, setTotalSections] = useState(-2);

  useEffect(() => {
    setTotalSections(Number(localStorage.getItem("total_sections")));
  }, []);

  const addFolder = () => {
    setFolders([
      ...folders,
      { title: "New Folder", description: "", files: [] },
    ]);
  };

  const deleteFolder = (index: number) => {
    setFolders(folders.filter((_, i) => i !== index));
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      { title: "New Task", description: "", type: "ACS", file: null },
    ]);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateSectionDetails = () => {
    onUpdate({ title: localTitle, description: localDescription, indice });
  };

  return (
    <div className="w-full mx-auto py-12 px-6 bg-white rounded-lg shadow-md relative mt-7 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre Sección
        </label>
        <input
          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          className="input-text"
          placeholder="Descripción"
        />
      </div>

      <button
        onClick={onDelete}
        className="text-gray-700 rounded-full p-1 shadow-md absolute top-3 right-3  hover:text-gray-500"
      >
        <CgClose className="w-5 h-5" />
      </button>

      <div className="inline-flex items-center justify-center gap-2 absolute top-3 right-20">
        <button disabled={indice - 1 === -1}>
          <IoIosArrowUp
            className={
              indice - 1 === -1
                ? "w-4 h-4 bg-gray-300 p-1 rounded-full"
                : "w-5 h-5"
            }
          />
        </button>
        <span>{indice}</span>
        <button disabled={indice + 1 === totalSections ? true : false}>
          <IoIosArrowDown
            className={
              indice + 1 === totalSections
                ? "w-4 h-4 bg-gray-300 p-1 rounded-full"
                : "w-5 h-5"
            }
          />
        </button>
      </div>

      <div className="inline-flex gap-1">
        <button
          onClick={updateSectionDetails}
          className="bg-blue-800 hover:bg-blue-700 btn2"
        >
          <MdEdit />
          Actualizar
        </button>

        <button onClick={onDelete} className="bg-red-800 hover:bg-red-700 btn2">
          <MdDeleteForever />
          Eliminar
        </button>

        <button
          onClick={addFolder}
          className="bg-green-800 hover:bg-green-700 btn2"
        >
          <LuCircleFadingPlus />
          Carpeta
        </button>
        <button
          onClick={addTask}
          className="bg-orange-800 hover:bg-orange-700 btn2"
        >
          <LuCircleFadingPlus />
          Tarea
        </button>
      </div>

      {folders.map((folder, index) => (
        <Folder key={index} {...folder} onDelete={() => deleteFolder(index)} />
      ))}
      {tasks.map((task, index) => (
        <Task key={index} {...task} onDelete={() => deleteTask(index)} />
      ))}
    </div>
  );
};

export default Section;

interface FolderType {
  title: string;
  description: string;
  files: FileType[];
}

interface TaskType {
  title: string;
  description: string;
  type: string;
  file: FileType | null;
}

interface FileType {
  title: string;
  description: string;
}
