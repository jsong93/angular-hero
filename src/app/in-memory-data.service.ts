import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {
  }

  createDb() {
    const heroes = [
      {id: 11, name: '元春'},
      {id: 12, name: '迎春'},
      {id: 13, name: '探春'},
      {id: 14, name: '惜春'},
      {id: 15, name: '王熙凤'},
      {id: 16, name: '林黛玉'},
      {id: 17, name: '薛宝钗'},
      {id: 18, name: '史湘云'},
      {id: 19, name: '巧姐'},
      {id: 20, name: '李纨'},
      {id: 21, name: '妙玉'},
      {id: 22, name: '秦可卿'}
    ];
    return {heroes};
    // return heroes;
    // throw new Error('Method not implemented.');
  }

  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
