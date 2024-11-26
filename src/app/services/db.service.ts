import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  // Abrir la base de datos
  async abrirDB() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'app_database.db', // Nombre de la base de datos
        location: 'default', // Ubicación predeterminada
      });
      console.log('CJ:¡Base de datos abierta OK!');
      // Llamar a la función para crear tablas después de abrir la base de datos
      await this.crearTablasUsuario();
    } catch (error) {
      console.error('CJ:Error al abrir la base de datos:', error);
    }
  }

  // Crear tablas
  private async crearTablasUsuario() {
    const query = `
      CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        correo TEXT NOT NULL UNIQUE,
        contrasena TEXT NOT NULL,
        nombre TEXT NOT NULL
      );
    `;
    if (!this.dbInstance) {
      console.error('CJ:La base de datos no está inicializada');
      return;
    }
    try {
      await this.dbInstance.executeSql(query, []);
      console.log('CJ: ¡Tabla usuario creada OK!');
    } catch (error) {
      console.error('CJ:Error al crear tabla usuario:', error);
    }
  }

  // Almacenar usuario
  async usuarioAlmacenar(correo: string, contrasena: string, nombre: string) {
    if (!this.dbInstance) {
      console.error('CJ:La base de datos no está inicializada');
      return;
    }
    const query = `
      INSERT INTO usuario (correo, contrasena, nombre)
      VALUES (?, ?, ?);
    `;
    try {
      await this.dbInstance.executeSql(query, [correo, contrasena, nombre]);
      console.log('CJ:¡Usuario almacenado OK!');
    } catch (error) {
      console.error('CJ:Error al almacenar usuario:', error);
    }
  }


  async obtenerCantidadUsuarios(): Promise<number> {
    try {
      // Asegúrate de que la base de datos esté abierta
      await this.abrirDB();
  
      // Verifica que dbInstance esté inicializado
      if (!this.dbInstance) {
        throw new Error('CJ:La base de datos no está inicializada.');
      }
  
      // Ejecuta la consulta para contar los usuarios
      const respuesta = await this.dbInstance.executeSql(
        `SELECT COUNT(*) AS cantidad FROM usuario`,
        []
      );
  
      // Verifica si hay filas en el resultado
      if (respuesta.rows.length > 0) {
        const cantidad = respuesta.rows.item(0).cantidad; // Accede al primer registro
        console.log('CJ:Cantidad de usuarios:', cantidad);
        return cantidad; // Retorna la cantidad
      }
  
      console.log('CJ:No se encontraron usuarios en la tabla.');
      return 0; // Retorna 0 si no hay filas
    } catch (error) {
      console.error('CJ:Error al obtener la cantidad de usuarios:', error);
      return 0; // Manejo de errores
    }
  }
  
  async actualizarClave(correo: string, nuevaContrasena: string): Promise<void> {
    if (!this.dbInstance) {
      console.error('La base de datos no está inicializada');
      return;
    }
  
    try {
      const query = `UPDATE usuario SET contrasena = ? WHERE correo = ?`;
      await this.dbInstance.executeSql(query, [nuevaContrasena, correo]);
      console.log(`Contraseña actualizada para el correo: ${correo}`);
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  }
  
  
}
