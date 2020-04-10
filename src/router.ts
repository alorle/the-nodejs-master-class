import { Handler, handlers } from "./handlers";

export type Router = {
  [name: string]: Handler;
};

export const router: Router = {
  ping: handlers.ping,
  hello: handlers.hello,
};

export const choseHandler = (path: string): Handler => {
  return router[path] ?? handlers.notFound;
};
