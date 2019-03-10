import { Injectable } from '@angular/core';
import { LoggerHelperService } from './logger-helper.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class BetterLoggerService {
  constructor(private loggerHelper: LoggerHelperService) {}

  logs: string[] = [];

  log(msg: string) {
    this.logs.push(msg);
    console.warn(`from betterLoggerserve class ${msg}`);
  }
}
