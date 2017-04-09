import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DetailsPage} from '../details/details';
import {HeroProvider} from '../../providers/hero';
import {IHeroResponse,IHero} from '../../providers/ihero';
import {ArrayUtils} from '../../utils/array.utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  items: any[];
  category: any;
  limit: any;
  constructor(public navCtrl: NavController,private heroService:HeroProvider) {

  }

  itemSelected(item) {
    this.navCtrl.push(DetailsPage, { item: item })
  }



  ngOnInit() {
    this.reload();
  }

  reload() {
    this.heroService.getHeroes().
      subscribe((resp:IHeroResponse) => {
        console.log('--', resp)
        let _items:IHero[] = resp.data as IHero[];
        ArrayUtils.sort(_items,'herocode','abc');
        this.items = _items;
      })
  } 

  viewItem(item) {
    this.navCtrl.push(DetailsPage, { item: item });
  }



}
