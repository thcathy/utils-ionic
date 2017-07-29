import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {ForumWishItem} from "../../app/entity/forum-wishlist";
import {ForumService} from "../../app/service/forum.service";

@Component({
  selector: 'page-forum-wish-list',
  templateUrl: 'forum-wish-list.html',
})
export class ForumWishListPage implements OnInit {
  wishlists: ForumWishItem[];
  itemText: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private forumService: ForumService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumWishListPage');
  }

  onAdd() {
    console.log(`Add ${this.itemText} to wish list`);
    this.forumService.addWishList(this.itemText)
      .then(newItem => {
        this.wishlists.push(newItem);
        this.itemText = '';
      })
  }

  onDelete(item: ForumWishItem) {
    console.log(`Delete ${item.text} from wish list`);
    this.forumService.deleteWishList(item.text)
      .then(list => this.wishlists = list);
  }

  confirmDelete(item: ForumWishItem) {
    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      subTitle: item.text,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: data => {
            this.onDelete(item);
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {
    this.forumService.getWishList().then(
      lists => this.wishlists = lists
    );
  }

}
