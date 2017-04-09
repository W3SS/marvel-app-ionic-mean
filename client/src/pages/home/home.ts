import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DetailsPage} from '../details/details';
import {HeroProvider} from '../../providers/hero';
import {IHeroResponse,IHero} from '../../providers/ihero';


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
        this.items = resp.data as IHero[];
      })
  } 

  viewItem(item) {
    this.navCtrl.push(DetailsPage, { item: item });
  }



}
