export const DEV_URL = "http://localhost:3000";
export const PROD_URL = "https://downloadcover.art";

export const API_BASE_URL = import.meta.env.DEV ? DEV_URL : PROD_URL;
