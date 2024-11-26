import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service'; // Asegúrate de ajustar la ruta al servicio

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private dbService: DbService // Inyecta el servicio de base de datos
  ) {}

  async ngOnInit() {
    try {
      // Inicializa la base de datos
      await this.dbService.abrirDB();
      console.log('Base de datos inicializada');

      // Lógica del splash screen
      setTimeout(() => {
        const splashImage = document.getElementById('splashImage');
        if (splashImage) {
          this.renderer.addClass(splashImage, 'explosion-effect');
        }

        setTimeout(() => {
          console.log('Redirigiendo a login...');
          this.router.navigate(['login']);
        }, 600);
      }, 2000); // Mostrar splash durante 2 segundos
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }
}
