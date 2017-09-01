import { Component } from '@angular/core';

/**
 * Generated class for the CnodeUserDetialsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cnode-user-detials',
  templateUrl: 'cnode-user-detials.html'
})
export class CnodeUserDetialsComponent {

  text: string;

  constructor() {
    console.log('Hello CnodeUserDetialsComponent Component');
    this.text = 'Hello World';
  }

}
