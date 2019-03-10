import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class LoggerHelperService {
  constructor() {
    console.log('just a logger helper');
  }
}
