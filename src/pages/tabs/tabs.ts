import { Component } from '@angular/core';

// import { MinePage } from '../mine/mine';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'mine';

  constructor() {

  }
}
