import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ForumThread} from "../../app/entity/forum-thread";
import {ForumService} from "../../app/service/forum.service";

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
              private forumService: ForumService) {
    this.threads = this.DEFAULT_THREAD;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log('Passed params', navParams.data);
    this.type = navParams.data['type'];
    this.forumService.getForumThreads(this.type, navParams.data['page'])
      .then(threads => {
        this.threads = threads;
        loading.dismiss();
      })
  }

  onSelectThread(thread: ForumThread): void {
    console.log('Selected thread: ' + thread);
    thread.visited = true;
    window.open('http://' + thread.url, '_blank');
    this.forumService.visitedUrl(thread.url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumThreadsPage');
  }

}
