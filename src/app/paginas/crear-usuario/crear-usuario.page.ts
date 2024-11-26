import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  isToastOpen = false;
  toastMessage = '';

  // Control de validez de campos
  nombreValido = true;
  correoValido = true;
  contrasenaValida = true;
  confirmarContrasenaValida = true;

  constructor(private router: Router, private dbService: DbService) {}

  async crearUsuario() {
    if (!this.validarInputs()) {
      this.mostrarToast('Por favor corrige los errores en los campos.');
      return;
    }

    try {
      await this.dbService.usuarioAlmacenar(
        this.correo,
        this.contrasena,
        this.nombre
      );
      this.mostrarToast('Usuario creado exitosamente.');
      setTimeout(() => this.router.navigate(['login']), 5000);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      this.mostrarToast('Error al crear el usuario.');
    }
  }

  validarInputs(): boolean {
    this.nombreValido = !!this.nombre.trim();
    this.correoValido = !!this.correo.trim() && this.validarCorreo(this.correo);
    this.contrasenaValida = !!this.contrasena.trim();
    this.confirmarContrasenaValida =
      this.contrasena === this.confirmarContrasena;

    return (
      this.nombreValido &&
      this.correoValido &&
      this.contrasenaValida &&
      this.confirmarContrasenaValida
    );
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  mostrarToast(mensaje: string) {
    this.toastMessage = mensaje;
    this.isToastOpen = true;
  }

  volverLogin() {
    this.router.navigate(['login']);
  }
}
