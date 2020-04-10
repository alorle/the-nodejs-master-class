import { Handler, HandlerData, HandlerCallback } from "./handler";

const pingHandler: Handler = (
  _data: HandlerData,
  callback: HandlerCallback,
): void => {
  callback(200);
};

const helloHandler: Handler = (
  _data: HandlerData,
  callback: HandlerCallback,
): void => {
  callback(200, { message: "Hello World!!" });
};

const notFoundHandler: Handler = (
  _data: HandlerData,
  callback: HandlerCallback,
): void => {
  callback(404);
};

export interface Handlers {
  [name: string]: Handler;
}

export const handlers: Handlers = {
  ping: pingHandler,
  hello: helloHandler,
  notFound: notFoundHandler,
};
