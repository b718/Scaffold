import startServer from "./server/server";
import getDatabaseClient from "./database/createDatabaseClient";

function main() {
  // start the server
  const primsaClient = getDatabaseClient();
  startServer(primsaClient);
}

main();
