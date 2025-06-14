import { createSlice } from "@reduxjs/toolkit";

import { StudentNoteMultipleByStudent } from "@/services/api/student_note";

export interface DataStudentNoteMultipleByStudent {
  data: StudentNoteMultipleByStudent[];
}

const initialState: DataStudentNoteMultipleByStudent = {
  data: [],
};

export const studentNoteMultipleByStudentSlice = createSlice({
  name: "studentNoteMultipleByStudentSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      // Actualiza el estado con los datos del usuario
      state.data = action.payload;
    },
  },
});

export const { setData } = studentNoteMultipleByStudentSlice.actions;
export default studentNoteMultipleByStudentSlice.reducer;
