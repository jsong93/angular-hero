export class Authorize {
  isAuthorize: boolean;
  constructor() {
    this.isAuthorize = Math.random() > 0.5 ? true : false;
  }
  getAuthorized() {
    return this.isAuthorize;
  }
}
