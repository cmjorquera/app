import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service'; // Importa el servicio de base de datos

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambio-pass.page.html',
  styleUrls: ['./cambio-pass.page.scss'],
})
export class CambioPassPage {
  correo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  isToastOpen: boolean = false; // Estado del Toast
  toastMessage: string = ''; // Mensaje dinámico para el Toast

  correoValido: boolean = true;
  nuevaContrasenaValida: boolean = true;
  confirmarContrasenaValida: boolean = true;

  constructor(private router: Router, private dbService: DbService) {}

  // Método para cambiar la contraseña
  async cambiarClave() {
    // Validar los campos
    if (!this.validarInputs()) {
      this.mostrarToast('Por favor corrige los errores en los campos.');
      return;
    }

    try {
      // Aquí puedes llamar a tu servicio de base de datos para actualizar la contraseña
      await this.dbService.actualizarClave(this.correo, this.nuevaContrasena);
      this.mostrarToast('Contraseña actualizada exitosamente.');
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirige al login después de 2 segundos
      }, 2000);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      this.mostrarToast('Ocurrió un error. Inténtalo nuevamente.');
    }
  }

  // Método para validar los inputs
  private validarInputs(): boolean {
    let esValido = true;

    if (!this.correo.trim() || !this.validarCorreo(this.correo)) {
      this.correoValido = false;
      esValido = false;
    } else {
      this.correoValido = true;
    }

    if (!this.nuevaContrasena.trim()) {
      this.nuevaContrasenaValida = false;
      esValido = false;
    } else {
      this.nuevaContrasenaValida = true;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.confirmarContrasenaValida = false;
      esValido = false;
    } else {
      this.confirmarContrasenaValida = true;
    }

    return esValido;
  }

  // Método para validar el formato del correo electrónico
  private validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  // Método para mostrar el Toast
  private mostrarToast(mensaje: string) {
    this.toastMessage = mensaje;
    this.isToastOpen = true;
  }
}
