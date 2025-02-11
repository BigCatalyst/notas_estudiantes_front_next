/* eslint-disable import/no-anonymous-default-export */
import * as authService from "./api/auth";
import * as auserService from "./api/user";

export default {
  ...authService,
  ...auserService,
};
