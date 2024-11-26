import { Component, OnInit } from '@angular/core';
// Importas el decorador `Component` para marcar esta clase como un componente Angular
// Importas la interfaz `OnInit` para manejar la inicialización del componente

@Component({
  selector: 'app-cabezera', // Nombre del componente que se usará en HTML
  templateUrl: './cabezera.component.html', // Ruta del archivo HTML del componente
  styleUrls: ['./cabezera.component.scss'], // Ruta del archivo CSS o SCSS del componente
})
export class CabezeraComponent implements OnInit {
  // Exportas esta clase para que pueda usarse en otros módulos
  // Implementas OnInit para manejar tareas de inicialización

  constructor() {
    // Constructor de la clase. Aquí podrías inyectar dependencias necesarias
  }

  ngOnInit() {
    // Método que Angular ejecuta automáticamente cuando se inicializa el componente
    // Aquí puedes inicializar datos o ejecutar lógica
    console.log('Componente Cabezera inicializado');
  }
}
