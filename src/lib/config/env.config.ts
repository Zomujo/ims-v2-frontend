export const getEnv = (key: string) => {
  const value = process.env[key];
  if (typeof value === "undefined") {
    throw new Error(`Missing env key: ${key}`);
  }
  return value;
};

export const ENV_VARIABLES = {
  IMS_API_ENPOINT: getEnv("IMS_API_URL"),
};
