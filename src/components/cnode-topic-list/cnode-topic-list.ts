import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Topic } from '../../models/topic';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/filter';
// import { timer} from  'rxjs/observable/timer';
import { zip } from 'rxjs/observable/zip';
import { Store } from '@ngrx/store';
import { NavController, InfiniteScroll } from 'ionic-angular';
// import { User } from '../../models/user';
import * as fromRoot from '../../reducers'
import * as topic from '../../actions/topics.action';

/**
 * Generated class for the CnodeListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-topic-list',
    templateUrl: 'cnode-topic-list.html'
})
export class CnodeTopicListComponent implements OnChanges {
    data: Observable<Topic[]>;
    pageIndex: Observable<number>;
    pageSize: Observable<number>;
    isFetching: Observable<boolean>;
    checkedUser: Observable<boolean>;
    @Input() tabName: string;
    constructor(private navCtrl: NavController, private store: Store<fromRoot.State>) {
        this.data = this.store.select(fromRoot.getTopics);
        this.pageIndex = this.store.select(fromRoot.getTopicsIndex);
        this.pageSize = this.store.select(fromRoot.getTopicsPageSize);
        this.isFetching = this.store.select(fromRoot.getTopicsIsFetching);
        this.checkedUser = this.store.select(fromRoot.checkedUser);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // 先告知tab被切换了， this.data 才会被切换
        this.store.dispatch(new topic.ChangeTabAction(this.tabName));
        // 判断如果data的length为0，才会去主动请求获取数据
        // timer(0).
        const timer$ = setInterval(() => {

            const x = zip(this.checkedUser, this.data)
                .filter(([checkedUser, data]) => {
                    return checkedUser === true && data.length === 0;
                })
                .subscribe(([checkedUser, data]) => {
                    this.store.dispatch(new topic.LoadAction({ tabName: this.tabName, pageIndex: 1 }));
                    if (x !== undefined){
                        x.unsubscribe();
                    }
                    clearInterval(timer$);
                        
                });
        }, 0);

        // this.data.filter(d => d.length === 0).subscribe(() => {
        //     this.store.dispatch(new topic.LoadAction({ tabName: this.tabName, pageIndex: 1 }));
        // }).unsubscribe();UNMET PEER DEPENDENCY
    }

    /**
     * 下拉刷新，重新获取第一页
     * @param refresher 
     */
    doRefresh(refresher: InfiniteScroll) {
        this.store.dispatch(new topic.ReloadAction({ tabName: this.tabName, pageIndex: 1 }));
        const x = this.isFetching
            .filter(f => f === false)
            .subscribe((v) => {
                refresher.complete();
                if (x !== undefined) {
                    x.unsubscribe();
                }
            });
    }

    /**
     * 上拉获取下一页
     * @param infiniteScroll 
     */
    doInfinite(infiniteScroll: InfiniteScroll) {
        this.pageIndex.subscribe(pageIndex => {
            this.store.dispatch(new topic.LoadAction({ tabName: this.tabName, pageIndex: pageIndex + 1 }));
            const x = this.isFetching
                .filter(f => f === false)
                .subscribe((v) => {
                    infiniteScroll.complete();
                    if (x !== undefined) {
                        x.unsubscribe();
                    }
                });

        }).unsubscribe();
    }


    // to(topic: Topic) {
    //     this.navCtrl.push('ArticlePage', { id: topic.id, tabName: this.tabName });
    // }


}
