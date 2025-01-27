import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false,
})
export class HomePage implements OnInit {
  posts: any[] = []; // Inicializa la propiedad `posts` como un arreglo.

  constructor() {}

  ngOnInit() {
    // Puedes inicializar los datos aquí.
    this.posts = [
      { title: 'Primer Post', content: 'Este es el contenido del primer post' },
      { title: 'Segundo Post', content: 'Este es el contenido del segundo post' },
    ];
  }

  addPost() {
    // Lógica para añadir un nuevo post.
    this.posts.push({
      title: `Post ${this.posts.length + 1}`,
      content: 'Este es un nuevo contenido',
    });
  }
}
