import { apiAuth } from "../api";

export const reportEscalafon = async () => {
  try {
    const res = await apiAuth.get("degree_scale/report/", {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const reportBajas = async () => {
  try {
    const res = await apiAuth.get("dropouts/report/", {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const reportNotasEstudiantesAsignaturas = async (id: string) => {
  try {
    const res = await apiAuth.get(`student_note/report/subject/${id}/`, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const reportCertificacionNotas = async (
  id_estudiante: string,
  grado: string
) => {
  try {
    const res = await apiAuth.get(
      `student_note/report/certification/${id_estudiante}/${grado}/`,
      {
        responseType: "blob",
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const reportStudents = async (query: string) => {
  try {
    const res = await apiAuth.get(`students/report/?${query}`, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
