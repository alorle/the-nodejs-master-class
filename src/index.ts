import { readFileSync } from "fs";
import { createServer as createHttpServer } from "http";
import {
  createServer as createHttpsServer,
  ServerOptions as HttpsServerOptions,
} from "https";
import { join } from "path";

import { environment } from "./config";
import { requestListener } from "./requestListener";

const httpServer = createHttpServer(requestListener);
httpServer.listen(environment.httpPort, () => {
  // eslint-disable-next-line no-console
  console.log(
    `HTTP server is listening on http://localhost:${environment.httpPort} in ${environment.envName} mode`,
  );
});

const httpsServerOptions: HttpsServerOptions = {
  key: readFileSync(join(__dirname, "..", "https", "key.pem")),
  cert: readFileSync(join(__dirname, "..", "https", "cert.pem")),
};
const httpsServer = createHttpsServer(httpsServerOptions, requestListener);
httpsServer.listen(environment.httpsPort, () => {
  // eslint-disable-next-line no-console
  console.log(
    `HTTPS server is listening on https://localhost:${environment.httpPort} in ${environment.envName} mode`,
  );
});
