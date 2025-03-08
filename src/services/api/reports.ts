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
