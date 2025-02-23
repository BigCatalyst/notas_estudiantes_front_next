/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";

interface TaskProps extends TaskType {
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ title, description, type, onDelete }) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localType, setLocalType] = useState(type);

  return (
    <div className="border p-4 mb-4 rounded">
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        className="text-base font-semibold border-b mb-2"
      />
      <textarea
        value={localDescription}
        onChange={(e) => setLocalDescription(e.target.value)}
        className="mb-2 w-full border p-2"
      />
      <select
        value={localType}
        onChange={(e) => setLocalType(e.target.value)}
        className="border rounded px-2 py-1 mt-2"
      >
        <option value="ACS">ACS</option>
        <option value="TCP">TCP</option>
        <option value="Prueba Final">Prueba Final</option>
      </select>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      >
        Delete
      </button>
      <input type="file" className="mt-2" />
    </div>
  );
};

export default Task;

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
