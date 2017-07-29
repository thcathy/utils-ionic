import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumTabPage } from './forum-tab';

@NgModule({
  declarations: [
    ForumTabPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumTabPage),
  ],
  exports: [
    ForumTabPage
  ]
})
export class ForumTabPageModule {}
