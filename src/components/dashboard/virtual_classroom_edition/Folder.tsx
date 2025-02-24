"use client";

import React, { useState } from "react";
import File from "./File";

interface FolderProps extends FolderType {
  onDelete: () => void;
}

const Folder: React.FC<FolderProps> = ({ title, description, onDelete }) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);

  const addFile = () => {
    setFiles([...files, { title: "New File", description: "" }]);
  };

  const deleteFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="border p-4 mb-4 rounded">
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        className="text-lg font-semibold border-b mb-2"
      />
      <textarea
        value={localDescription}
        onChange={(e) => setLocalDescription(e.target.value)}
        className="mb-2 w-full border p-2"
      />
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
      <button
        onClick={addFile}
        className="bg-purple-500 text-white px-2 py-1 rounded"
      >
        Add File
      </button>
      {files.map((file, index) => (
        <File key={index} {...file} onDelete={() => deleteFile(index)} />
      ))}
    </div>
  );
};

export default Folder;

interface FolderType {
  title: string;
  description: string;
  files: FileType[];
}

interface FileType {
  title: string;
  description: string;
}
