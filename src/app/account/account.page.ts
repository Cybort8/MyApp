import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3SidmuD4NkMgbH8hzatJA1vOmgnSgb6Qjw&s',
    followed_users: [],
    following_users: []
  };
  constructor(
    private userService: UserService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "usuario");
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }


  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

}