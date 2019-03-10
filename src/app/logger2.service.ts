import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class Logger2Service {
  constructor() {}
  logs: string[] = [];
  log(msg: string) {
    this.logs.push(msg);
    console.warn(`from logger2serve class ${msg}`);
  }
}
