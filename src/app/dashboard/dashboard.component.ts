import {Component, OnInit, ViewChild} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {STColumn, STComponent} from '@delon/abc';
import {SFComponent} from '@delon/form';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  url = '/url';

  @ViewChild('st') st: STComponent;
  @ViewChild('sf') sf: SFComponent;
  // columns: STColumn[] = [
  //   {title: '编号', index: 'no'},
  //   {title: '调用次数', type: 'number', index: 'callNo'},
  //   {title: '头像', type: 'img', width: '50px', index: 'avatar'},
  //   {title: '时间', type: 'date', index: 'updatedAt'},
  //   {
  //     title: '',
  //     buttons: [
  //       {text: '查看', click: (item: any) => `/form/${item.id}`},
  //       {
  //         text: '编辑',
  //         type: 'static',
  //         component: SiAdminUserEditComponent,
  //         click: 'reload',
  //       },
  //     ],
  //   },
  // ];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
