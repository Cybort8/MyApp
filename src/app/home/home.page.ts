import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;
  constructor(
    private postService: PostService,
    private modalController: ModalController,
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  ngOnInit(){
    console.log('Init Home');
    this.loadPosts();
  }

  loadPosts(event?: any){
    console.log('Load Posts');
    this.postService.getPost(this.page, this.limit).then(
      (data: any)=>{
        if (data.length > 0){
          this.posts = [...this.posts, ...data];
          this.page++;
        }else{
          this.hasMore = false;
        }

        if (event){
          event.target.complete();
        }
      },
      (error)=>{
        console.log(error);
        if (event){
          event.target.complete();
        }
      }
    )
  }

  closeMenu(){
    this.menu.close();
  }
  log_out(){
    this.storage.remove("isUserLoggedIn");
    this.navCtrl.navigateRoot("/login");
  }

}