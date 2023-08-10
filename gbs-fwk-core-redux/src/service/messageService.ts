import { Subject } from "rxjs";

const subject = new Subject();

export const messageService = {
  sendMessage: (message: unknown) => subject.next(message),
  clearMessages: () => subject.next(null),
  getMessage: () => subject.asObservable(),
};
