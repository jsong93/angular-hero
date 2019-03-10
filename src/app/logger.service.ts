import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class LoggerService {
  constructor() {}

  logs: string[] = [];
  log(msg: string) {
    this.logs.push(msg);
    console.warn(`from loggerserve class ${msg}`);
  }
  hello() {}
}
