import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle'; //IMPORTAMOS EL REGISTER DE SWIPER

register(); //REGISTRAMOS EL SWIPER

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
}