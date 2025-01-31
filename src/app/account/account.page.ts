import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    last_name: '',
    email: '',
    username: '',
    image: '',
    followees: [],
    followers: [],
  };
  originalUserData: any = {};
  isEditing: boolean = false;

  constructor(private userService: UserService, private storage: Storage) {}

  async ngOnInit() {
    const user: any = await this.storage.get('user');
    console.log(user, 'usuario');
    
    if (user?.id) {
      this.userService
        .getUser(user.id)
        .then((data: any) => {
          console.log(data);
          this.storage.set('user', data);
          this.user_data = data;
          this.originalUserData = { ...data };
        })
        .catch((error) => {
          console.log('Error al obtener el usuario:', error);
          alert('Hubo un error al obtener los datos del usuario');
        });
    } else {
      console.log('ID de usuario no encontrado');
      alert('No se encontró el usuario');
    }
  }

  editProfile() {
    this.isEditing = true;
    console.log('Modo edición activado');
  }

  cancelEdit() {
    this.isEditing = false;
    this.user_data = { ...this.originalUserData };
    console.log('Modo edición desactivado');
  }

  async takePhoto() {
    console.log('take photo');
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
      });
      console.log(capturedPhoto.dataUrl);
      this.user_data.image = capturedPhoto.dataUrl;
    } catch (error) {
      console.log('Error al tomar la foto:', error);
    }
  }

  async update() {
    console.log('Actualizando perfil:', this.user_data);

    if (!this.user_data.id) {
      alert('No se pudo encontrar el ID del usuario');
      return;
    }

    this.userService
      .updateUser(this.user_data)
      .then((data) => {
        console.log(data, 'Perfil actualizado');
        alert('Perfil actualizado exitosamente');
        this.storage.set('user', this.user_data);
        this.originalUserData = { ...this.user_data };
        this.isEditing = false;
      })
      .catch((error) => {
        console.log('Error al actualizar el perfil:', error);
        alert('Hubo un error al actualizar el perfil');
      });
  }
}