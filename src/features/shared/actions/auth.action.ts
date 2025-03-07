import {
  AuthLoginActionCredentials,
  AuthLoginActionResponse,
} from "../types/auth-action.types";
import { imsApiWithoutAuth } from "./ims-api.action";

export const authLoginAction = async ({
  email,
  password,
}: AuthLoginActionCredentials) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: "/auth/login",
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
