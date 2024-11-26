import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent {
  constructor(private router: Router) {}

  // Método para cerrar sesión y redirigir al login
  volverLogin() {
    this.router.navigate(['login']);
  }

  crearTicket() {
    this.router.navigate(['login']);
  }

  Colaboradores() {
    this.router.navigate(['login']);
  }

  Mensajes() {
    this.router.navigate(['login']);
  }

  Bitacora() {
    this.router.navigate(['login']);
  }

  Codigo_QR() {
    this.router.navigate(['login']);
  }

  Configuracion() {
    this.router.navigate(['login']);
  }

  modificaruusuario() {
    this.router.navigate(['modificar-usuario']);
  }
}
