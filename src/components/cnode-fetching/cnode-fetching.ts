import { Component } from '@angular/core';

/**
 * Generated class for the CnodeFetchingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cnode-fetching',
  templateUrl: 'cnode-fetching.html'
})
export class CnodeFetchingComponent {

  text: string;

  constructor() {
    this.text = '正在加载...';
  }

}
