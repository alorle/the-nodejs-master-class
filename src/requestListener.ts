import { RequestListener, IncomingMessage, ServerResponse } from "http";
import { StringDecoder } from "string_decoder";
import { parse } from "url";

import { HandlerData } from "./handlers";
import { isValidMethod, HttpMethod } from "./http";
import { choseHandler } from "./router";

const normalizeMethod = (method: string): HttpMethod => {
  const candidate = method.trim().toUpperCase();

  if (isValidMethod(candidate)) {
    return candidate;
  }

  throw TypeError("invalid HTTP method");
};

const normalizePath = (path: string): string => {
  return path.trim().replace(/^\/+|\/+$/g, "");
};

export const requestListener: RequestListener = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  const url = parse(req.url ?? "", true);

  const { headers } = req;
  const { pathname, query } = url;

  const method = normalizeMethod(req.method ?? "");
  const path = normalizePath(pathname ?? "");

  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", (chunk: unknown): void => {
    if (Buffer.isBuffer(chunk)) {
      buffer += decoder.write(chunk);
    }
  });

  req.on("end", (): void => {
    buffer += decoder.end();

    const chosenHandler = choseHandler(path);

    const data: HandlerData = {
      method,
      path,
      headers,
      query,
      payload: buffer,
    };

    chosenHandler(data, (statusCode: number, payload?: unknown): void => {
      const resPayload = typeof payload === "object" ? payload : {};
      const resPayloadStr = JSON.stringify(resPayload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(resPayloadStr);

      // eslint-disable-next-line no-console
      console.log(statusCode, resPayloadStr);
    });
  });
};
