import { Component } from '@angular/core';

/**
 * Generated class for the CnodeItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cnode-item',
  templateUrl: 'cnode-item.html'
})
export class CnodeItemComponent {

  text: string;

  constructor() {
    console.log('Hello CnodeItemComponent Component');
    this.text = 'Hello World';
  }

}
