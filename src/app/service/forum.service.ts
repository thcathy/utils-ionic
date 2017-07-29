import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ForumThread } from '../entity/forum-thread';
import {ForumWishItem} from "../entity/forum-wishlist";

declare const ENV;

@Injectable()
export class ForumService {
  private LIST_URL = ENV.apiHost + '/rest/forum/list/';  // URL to web API
  private VISITED_URL = ENV.apiHost + '/rest/forum/visited';
  private WISHLIST_URL = ENV.apiHost + '/rest/forum/wishlist/list';
  private ADD_WISHLIST_URL = ENV.apiHost + '/rest/forum/wishlist/add/';
  private DELETE_WISHLIST_URL = ENV.apiHost + '/rest/forum/wishlist/delete/';

  constructor (private http: Http) {}

  getForumThreads(type: String, page: number): Promise<ForumThread[]> {
    return this.http.get(this.LIST_URL + type + "/" + page)
      .toPromise()
      .then(response => response.json() as ForumThread[])
      .catch(this.handleError);
  }

  visitedUrl(url: string): Promise<string> {
    return this.http.post(this.VISITED_URL, url)
      .toPromise()
      .then(response => 'success')
      .catch(this.handleError);
  }

  getWishList(): Promise<ForumWishItem[]> {
    return this.http.get(this.WISHLIST_URL)
      .toPromise()
      .then(response => response.json() as ForumWishItem[])
      .catch(this.handleError);
  }

  addWishList(text: string): Promise<ForumWishItem> {
    return this.http.get(this.ADD_WISHLIST_URL + text)
      .toPromise()
      .then(response => response.json() as ForumWishItem)
      .catch(this.handleError);
  }

  deleteWishList(text: string): Promise<ForumWishItem[]> {
    return this.http.get(this.DELETE_WISHLIST_URL + text)
      .toPromise()
      .then(response => response.json() as ForumWishItem[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
