import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Storage } from '@ionic/storage-angular'; // IMPORTAMOS EL STORAGE
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage // INYECTAMOS EL STORAGE
  ) { } 

  ngOnInit() {
  }

  finish(){
    console.log('Finish');
    this.storage.set('viLaIntro', true); // GUARDAMOS EN EL STORAGE QUE YA SE HA MOSTRADO LA INTRODUCCIÓN
    this.router.navigateByUrl('/menu/home'); 
  }

}