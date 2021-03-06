import { Injectable, Optional } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { LoggerService } from './logger.service';
import { Logger2Service } from './logger2.service';
import { AuthService } from './auth.service';
import { AppConf, Appconfig } from './appconfig';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private https: _HttpClient,
    // 依赖不是必须的，如果没有，为空
    @Optional() private logger: LoggerService,
    private logger2: Logger2Service,
    private authservice: AuthService // private appConf: Appconfig
  ) {}

  // getHeroes(): Observable<Hero[]> {
  //   // this.messageService.add('HeroService: fetched heroes');
  //   // return of(HEROES);
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(catchError(this.handelError('getHeroes', [])));
  // }
  // getHeroes(): Observable<[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched heroes')),
  //       catchError(this.handleError('getHeroes', []))
  //     )
  //     ;
  // }

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched heroes')),
  //       catchError(this.handleError<Hero>('getHeroes', []))
  //     )
  //     ;
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    this.logger.log('gethero');
    this.logger.hello();
    this.authservice.getUsers();
    if (this.logger) {
      console.log('optional');
    }
    // this.logger2.log('gethero');
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    this.http.get('/user').subscribe(() => {
      console.log(111);
    });
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`delete hero id =${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError('searchHeroes', []))
    );
  }

  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  // getHero(id: number): Observable<Hero[]> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url)
  //     .pipe(tap(_ => this.log(`fetched hero id=${id}`)),
  //       catchError(this.handleError<Hero>(`getHero id=${id}`), []));
  // }

  /** GET hero by id. Will 404 if id not found */
  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }
  private log(message: string) {
    this.messageService.add(`HeroService:${message}`);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
