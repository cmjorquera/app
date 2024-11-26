import { Component } from '@angular/core';

// Estructura para manejar notas (puedes adaptarla según lo necesites)
interface Nota {
  titulo: string;
  observacion: string;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {
  nuevaNota: Nota = { titulo: '', observacion: '' }; // Modelo para nueva nota
  notas: Nota[] = []; // Lista de notas

  constructor() {}

  // Agregar una nueva nota
  agregarNota() {
    if (this.nuevaNota.titulo.trim() && this.nuevaNota.observacion.trim()) {
      this.notas.push({ ...this.nuevaNota }); // Agregar la nota a la lista
      this.nuevaNota = { titulo: '', observacion: '' }; // Limpiar el formulario
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Eliminar una nota
  eliminarNota(index: number) {
    this.notas.splice(index, 1); // Elimina la nota en la posición indicada
  }

  // Modificar una nota
  modificarNota(index: number) {
    const nota = this.notas[index]; // Obtén la nota seleccionada
    this.nuevaNota = { ...nota }; // Carga la nota en el formulario
    this.notas.splice(index, 1); // Elimina temporalmente la nota para modificarla
  }

  // Leer código QR (ejemplo básico, implementa según la funcionalidad que necesites)
  async leerQR() {
    try {
      const qrData = 'PGY4121|Programación de Aplicaciones Móviles|22-11-2024'; // Simula un código QR
      const [seccion, curso, fecha] = qrData.split('|'); // Divide el texto del QR
      console.log(`Sección: ${seccion}, Curso: ${curso}, Fecha: ${fecha}`);
      alert(`Sección: ${seccion}, Curso: ${curso}, Fecha: ${fecha}`);
    } catch (error) {
      console.error('Error al leer el QR:', error);
      alert('Error al leer el código QR.');
    }
  }
}
