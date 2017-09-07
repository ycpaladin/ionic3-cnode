import { Component, Input } from '@angular/core';
import { Message } from '../../models/message';

import { NavController } from 'ionic-angular';

/**
 * Generated class for the CnodeMessageGroupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-message-group',
    templateUrl: 'cnode-message-group.html'
})
export class CnodeMessageGroupComponent {

    @Input() title: string;
    @Input() data: Message[];
    constructor(public navCtrl: NavController) {

    }

    toUser(loginname: string) {
        this.navCtrl.push('page-detials', { loginname });
    }

    toArticle(id: string) {
        this.navCtrl.push('ArticlePage', { id, tabName: this.title });
    }
}
