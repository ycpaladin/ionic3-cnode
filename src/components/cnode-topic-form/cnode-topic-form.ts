import { Component, Input } from '@angular/core';
import { TopicFromModel } from '../../models/topic';

/**
 * Generated class for the CnodeTopicFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'cnode-topic-form',
    templateUrl: 'cnode-topic-form.html'
})
export class CnodeTopicFormComponent {

    @Input() model: TopicFromModel;

    constructor() {
        
    }

}
