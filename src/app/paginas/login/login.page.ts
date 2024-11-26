import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service'; // Importa el servicio de base de datos

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = '';
  contrasena: string = '';
  cantidadUsuarios: number = 0; // Almacena la cantidad de usuarios
  correoInvalido: boolean = false; // Estado visual para el correo
  contrasenaInvalida: boolean = false; // Estado visual para la contraseña
  isToastOpen = false; // Estado del toast
  toastMessage = ''; // Mensaje dinámico del toast

  constructor(private router: Router, private db: DbService) {}

  async ngOnInit() {
    try {
      this.cantidadUsuarios = await this.db.obtenerCantidadUsuarios(); // Obtiene la cantidad de usuarios
      console.log('Cantidad de usuarios:', this.cantidadUsuarios);
    } catch (error) {
      console.error('Error al obtener la cantidad de usuarios:', error);
    }
  }

  iniciarSesion() {
    // Reinicia las validaciones visuales
    this.correoInvalido = false;
    this.contrasenaInvalida = false;

    // Validaciones
    if (!this.validarInputs()) {
      this.mostrarToast('Por favor corrige los errores en los campos.');
      return;
    }

    // Lógica para iniciar sesión
    console.log('Iniciando sesión con:', this.correo, this.contrasena);
    this.router.navigate(['/principal']);
  }

  crearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }

  private validarInputs(): boolean {
    let esValido = true;

    if (!this.correo.trim() || !this.validarCorreo(this.correo)) {
      this.correoInvalido = true;
      esValido = false;
    }

    if (!this.contrasena.trim()) {
      this.contrasenaInvalida = true;
      esValido = false;
    }

    return esValido;
  }

  private validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  private mostrarToast(mensaje: string) {
    this.toastMessage = mensaje;
    this.isToastOpen = true;
    setTimeout(() => {
      this.isToastOpen = false;
    }, 3000);
  }


  irACambioPass() {
    this.router.navigate(['/cambio-pass']);
  }
  
  // funcion de ejemplo
  navegarOtraPagina() {
    this.router.navigate(['/principal']); // Cambia '/ruta-deseada' por la página que quieres abrir.
  }
  
}
