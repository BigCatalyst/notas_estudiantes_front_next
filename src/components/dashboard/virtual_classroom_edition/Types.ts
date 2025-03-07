import { Student } from "@/services/api/students";
export interface SectionType {
  id?: number;
  title: string;
  description: string;
  index: number;
  folders?: FolderType[];
  tasks?: TaskType[];
}

export interface FolderType {
  id?: number;
  title: string;
  description: string;
  files?: FileType[];
}

export interface TaskType {
  id?: number;
  title: string;
  description: string;
  files?: FileType[];
  students_responses?: StudentResponseType[];
}

export interface StudentResponseType {
  id?: number;
  description?: string;
  student: Student;
  files?: FileType[];
}

export interface FileType {
  id?: number;
  title?: string;
  description?: string;
  fileName?: string;
  file?: string;
}

export interface ErrorRes {
  title: string[];
  folders: Folder[];
  tasks: Task[];
}

export interface Folder {
  title: string[];
  files: FolderFile[];
}

export interface FolderFile {
  title: string[];
  file: string[];
}

export interface Task {
  title: string[];
  files: TaskFile[];
}

export interface TaskFile {
  title: string[];
  file: string[];
}
