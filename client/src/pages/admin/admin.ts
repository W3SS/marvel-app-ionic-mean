import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IHero} from '../../providers/ihero';
import {HeroProvider} from '../../providers/hero';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  formData:any = {
    heroname:'',
    realname:'',
    herocode:'',
    team:'',
    description:'',
    type:'',
    basestats:{
      health:0,
      power:0,
    },
    substats:{
      strength:0,
      speed:0,
      stamina:0,
      agility:0,
      intelligence:0
    }
  }

  constructor(public navCtrl: NavController,
  private heroService:HeroProvider,
  private toastCtrl: ToastController) {

  }

  createHero(e){
    e.preventDefault();
    let newHero = this.formData as IHero;
    this.heroService.createHero(newHero).subscribe( (resp)=>{
      console.log('result : ' , resp);
      this.showToast('Hero created!');
    })
  }

  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
