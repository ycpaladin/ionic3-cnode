import { Component, Input } from '@angular/core';

import { Author } from '../../models/user-detials';

import { NavController } from 'ionic-angular';

/**
 * Generated class for the CnodeTopicItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-topic-item',
    templateUrl: 'cnode-topic-item.html'
})
export class CnodeTopicItemComponent {

    @Input() item: { id: string, title: string, top?: boolean, good?: boolean, author: Author, create_at: Date, last_reply_at: Date };

    constructor(private navCtrl: NavController, ) {

    }


    to() {
        this.navCtrl.push('ArticlePage', { id: this.item.id, tabName: 'dev' });
    }


}
