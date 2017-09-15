import { Component, Input, ViewChild } from '@angular/core';
import { TopicFromModel } from '../../models/topic';
import { NgForm } from '@angular/forms';


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

    @ViewChild('form') form: NgForm;
    constructor() {

    }

    get isValid(): boolean {
        return this.form.valid;
    }

}
