declare module Express {
  export interface Request {
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
  }
}
