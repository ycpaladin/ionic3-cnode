import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import moment from 'moment';

/**
 * Generated class for the CnodeFromNowDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
    selector: '[cnode-from-now]' // Attribute selector
})
export class CnodeFromNowDirective implements OnInit {

    @Input('cnode-from-now') dateTime: Date;
    constructor(private ele: ElementRef) {

    }


    ngOnInit(): void {
        (<HTMLElement>this.ele.nativeElement).innerText = moment(this.dateTime).locale('zh-cn').fromNow();
    }


}
