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
    console.log("res>>>", res);
    return res.data;
  } catch (error) {
    console.log("error>>>", error);
    return null;
  }
};
