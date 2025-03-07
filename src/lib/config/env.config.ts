export const getEnv = (key: string) => {
  return process.env[key];
};

export const ENV_VARIABLES = {
  IMS_API_ENPOINT: getEnv("IMS_API_URL"),
  NEXT_AUTH_SECRET: getEnv("NEXT_AUTH_SECRET"),
};
