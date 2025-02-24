"use client";

import React, { useState } from "react";

interface FileProps extends FileType {
  onDelete: () => void;
}

const File: React.FC<FileProps> = ({ title, description, onDelete }) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);

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
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
      <input type="file" className="mt-2" />
    </div>
  );
};

interface FileType {
  title: string;
  description: string;
}

export default File;
