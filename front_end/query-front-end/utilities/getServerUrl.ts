export default function getServerUrl() {
  if (process.env.DEV == "true" || !process.env.DEV) {
    return "http://localhost:3001/";
  }

  return process.env.SERVER_URL_PROD;
}
