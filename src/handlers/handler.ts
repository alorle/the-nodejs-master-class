import { IncomingHttpHeaders } from "http";
import { ParsedUrlQuery } from "querystring";

import { HttpMethod } from "../http";

export interface HandlerData {
  method: HttpMethod;
  path: string;
  headers: IncomingHttpHeaders;
  query: ParsedUrlQuery;
  payload: string;
}

export type HandlerCallback = (statusCode: number, payload?: unknown) => void;

export type Handler = (data: HandlerData, callback: HandlerCallback) => void;
