import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumThreadsPage } from './forum-threads';

@NgModule({
  declarations: [
    ForumThreadsPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumThreadsPage),
  ],
  exports: [
    ForumThreadsPage
  ]
})
export class ForumThreadsPageModule {}
