import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Authorize } from './authorize';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthService {
  isAuthorized: boolean;
  constructor(private logger: LoggerService, isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  getUsers() {
    if (this.isAuthorized) {
      this.logger.log('get users');
    } else {
      this.logger.log('not isAuthorized');
    }
  }
}
