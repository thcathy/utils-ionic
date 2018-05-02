import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ForumThread} from "../../app/entity/forum-thread";
import {ForumService} from "../../app/service/forum.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../../app/service/app.service";

/**
 * Generated class for the ForumThreadsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forum-threads',
  templateUrl: 'forum-threads.html',
})
export class ForumThreadsPage {
  DEFAULT_THREAD = [
    { "url": "/", "title": "loading", "source": "loading", "visited": false, "wished": false, "createdDate": new Date()}
  ];

  threads:  ForumThread[];
  type: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public forumService: ForumService,
              public appService: AppService) {
    this.threads = this.DEFAULT_THREAD;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000
    });
    loading.present();
    console.log('Passed params', navParams.data);
    this.type = navParams.data['type'];
    this.forumService.getForumThreads(this.type, navParams.data['page'])
      .subscribe(
        data => {
          this.threads = data;
          loading.dismiss();
          },
        err => this.appService.handleError(err)
      )
  }

  onSelectThread(thread: ForumThread): void {
    console.log('Selected thread: ' + thread);
    thread.visited = true;
    window.open('http://' + thread.url, '_blank');
    this.forumService.visitedUrl(thread.url, thread.title);
  }

  addToWishList(thread: ForumThread): void {
    console.log(`add ${thread.title} to wish list`);
    this.forumService.addWishList(thread.title).then(i => {
      thread.wished = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumThreadsPage');
  }

}
