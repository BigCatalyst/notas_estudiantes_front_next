/* eslint-disable import/no-anonymous-default-export */
import * as authService from "./api/auth";
import * as userService from "./api/user";
import * as studentService from "./api/students";
import * as careersService from "./api/careers";
import * as school_yearService from "./api/school_year";
import * as student_noteService from "./api/student_note";
import * as students_ballotService from "./api/students_ballot";
import * as subjectsService from "./api/subjects";
import * as dropoutsService from "./api/dropouts";
import * as professorService from "./api/professor";
import * as eventService from "./api/events";
import * as subjectsectionsubjectsService from "./api/virtual_classroom_edition";

export default {
  ...authService,
  ...userService,
  ...studentService,
  ...careersService,
  ...school_yearService,
  ...student_noteService,
  ...students_ballotService,
  ...subjectsService,
  ...dropoutsService,
  ...professorService,
  ...eventService,
  ...subjectsectionsubjectsService,
};
