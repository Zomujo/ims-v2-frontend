import { AuthApiStandardResponse } from "@features/shared/types/auth-action.types";

export async function safeRequest<
  T extends AuthApiStandardResponse = AuthApiStandardResponse,
>(request: () => Promise<T>): Promise<T> {
  try {
    const res = await request();

    if (res.error) {
      throw new Error(res.error);
    }

    return res;
  } catch (error) {
    return {
      error: (error as Error).message,
    } as T;
  }
}
