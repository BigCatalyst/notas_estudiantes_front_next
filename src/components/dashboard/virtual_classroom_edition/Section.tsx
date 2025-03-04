/* eslint-disable prefer-const */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FolderRef } from "./Folder";
import Task from "./Task";
import { CgClose } from "react-icons/cg";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuCircleFadingPlus } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import Modal from "@/components/ui/modal/Modal";
import { FolderType, SectionType, TaskType } from "./Types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SectionProps extends SectionType {
  onDelete: () => void;
  onUpdate?: (newSection: SectionType) => void;
  onIndexUp?: () => void;
  onIndexDown?: () => void;
  ref?: any;
}

export const SectionRef = forwardRef((props: SectionProps, ref) => (
  <Section {...props} ref={ref} />
));

const Section: React.FC<SectionProps> = ({
  id,
  title,
  description,
  index,
  onDelete,
  folders,
  tasks,
  onIndexDown,
  onIndexUp,
  ref,
}) => {
  const [folders2, setFolders] = useState<FolderType[]>(folders ? folders : []);
  const [tasks2, setTasks] = useState<TaskType[]>(tasks ? tasks : []);
  const localTitle = useRef(title);
  const localDescription = useRef(description);
  const [totalSections, setTotalSections] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const childRefs = useRef<{ [key: string]: any }>({});
  const childRefs1 = useRef<{ [key: string]: any }>({});

  useImperativeHandle(ref, () => ({
    getData() {
      let list: FolderType[] = [];
      if (childRefs.current) {
        Object.keys(childRefs.current).forEach((key) => {
          if (childRefs.current[key]?.getData) {
            let a = childRefs.current[key].getData();
            list.push(a);
          }
        });
      }

      let list1: TaskType[] = [];
      if (childRefs1.current) {
        Object.keys(childRefs1.current).forEach((key) => {
          if (childRefs1.current[key]?.getData) {
            let a = childRefs1.current[key].getData();
            list1.push(a);
            console.log(a.students_responses);
          }
        });
      }
      return {
        id: id,
        title: localTitle.current,
        description: localDescription.current,
        index: index,
        folders: list,
        tasks: list1,
      };
    },
  }));

  useEffect(() => {
    setTotalSections(Number(localStorage.getItem("total_sections")));
  }, []);

  const addFolder = () => {
    let list: FolderType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          let a = childRefs.current[key].getData();
          list.push(a);
        }
      });
    }

    let listTask: TaskType[] = [];
    if (childRefs1.current) {
      Object.keys(childRefs1.current).forEach((key) => {
        if (childRefs1.current[key]?.getData) {
          let a = childRefs1.current[key].getData();
          list.push(a);
        }
      });
    }

    setTasks(listTask);

    setFolders([...list, { title: "New Folder", description: "", files: [] }]);
  };

  const deleteFolder = (indexPos: number) => {
    //if (folders2) setFolders(folders2.filter((_, i) => i !== indexPos));
    let dataupdate: FolderType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a });
        }
      });
    }
    let res: FolderType[] = [];
    dataupdate.map((val, index) => index !== indexPos && res.push({ ...val }));
    setFolders(res);
  };

  const addTask = () => {
    let list: TaskType[] = [];
    if (childRefs1.current) {
      Object.keys(childRefs1.current).forEach((key) => {
        if (childRefs1.current[key]?.getData) {
          let a = childRefs1.current[key].getData();
          list.push(a);
        }
      });
    }

    let dataupdate: FolderType[] = [];
    if (childRefs.current) {
      Object.keys(childRefs.current).forEach((key) => {
        if (childRefs.current[key]?.getData) {
          const a = childRefs.current[key].getData();
          dataupdate.push({ ...a });
        }
      });
    }

    setFolders(dataupdate);

    setTasks([...list, { title: "New Task", description: "" }]);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks2.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto py-12 px-6 bg-white rounded-lg shadow-md relative mt-7 space-y-4">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        action={() => onDelete()}
        message="Desea eliminar esta Sección?"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre Sección
        </label>
        <input
          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          type="text"
          defaultValue={title}
          onChange={(e) => (localTitle.current = e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          defaultValue={description}
          onChange={(e) => (localDescription.current = e.target.value)}
          className="input-text"
          placeholder="Descripción"
        />
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="text-gray-700 rounded-full p-1 shadow-md absolute top-3 right-3  hover:text-gray-500"
      >
        <CgClose className="w-5 h-5" />
      </button>

      <div className="inline-flex items-center justify-center gap-2 absolute top-3 right-20">
        <button disabled={index - 1 === -1 ? true : false} onClick={onIndexUp}>
          <IoIosArrowUp
            className={
              index - 1 === -1
                ? "w-4 h-4 bg-gray-300 p-1 rounded-full"
                : "w-5 h-5 shadow-md rounded-full p-1"
            }
          />
        </button>

        <span>{index}</span>

        <button disabled={index + 1 === totalSections} onClick={onIndexDown}>
          <IoIosArrowDown
            className={
              index + 1 === totalSections
                ? "w-4 h-4 bg-gray-300 p-1 rounded-full"
                : "w-5 h-5 shadow-md rounded-full p-1"
            }
          />
        </button>
      </div>

      <div className="inline-flex gap-1">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-800 hover:bg-red-700 btn2"
        >
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

      {folders2.length > 0 && (
        <div className="mt-7  shadow-md rounded-lg p-7 bg-gray-50">
          <h1 className="text-xl font-bold mb-4 text-gray-700 border-b-1 border-b-gray-300 w-full text-center pb-2">
            Carpetas
          </h1>
          {folders2 &&
            folders2.map((folder, index) => (
              <FolderRef
                key={index + Date.now()}
                {...folder}
                onDelete={() => deleteFolder(index)}
                ref={(el: any) => (childRefs.current[`child-${index}`] = el)}
              />
            ))}
        </div>
      )}

      {tasks2.length > 0 && (
        <div className="mt-7  shadow-xl rounded-lg p-7 bg-gray-50">
          <h1 className="text-xl font-bold mb-4 text-gray-700 border-b-1 border-b-gray-300 w-full text-center pb-2">
            Tareas
          </h1>

          {tasks2.map((task, index) => (
            <Task
              key={index + Date.now()}
              {...task}
              onDelete={() => deleteTask(index)}
              ref={(el: any) => (childRefs1.current[`child-${index}`] = el)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
