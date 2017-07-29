import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ForumWishListPage} from "../forum-wish-list/forum-wish-list";
import {ForumThreadsPage} from "../forum-threads/forum-threads";

/**
 * Generated class for the ForumTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'forum-tab',
  segment: 'forum-tab/:tabIndex'
})
@Component({
  selector: 'page-forum-tab',
  templateUrl: 'forum-tab.html',
})
export class ForumTabPage {
  musicTab: any;
  movieTab: any;
  wishListTab: any;
  mySelectedIndex: number;

  musicTabParams = {
    type: 'MUSIC',
    page: 1
  };

  movieTabParams = {
    type: 'MOVIE',
    page: 1
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.wishListTab = ForumWishListPage;
    this.musicTab = ForumThreadsPage;
    this.movieTab = ForumThreadsPage;
    this.mySelectedIndex = navParams.get('tabIndex') || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumTabPage');
  }

}
