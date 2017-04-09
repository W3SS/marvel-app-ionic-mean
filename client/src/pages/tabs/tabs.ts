import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AdminPage } from '../admin/admin';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AdminPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
