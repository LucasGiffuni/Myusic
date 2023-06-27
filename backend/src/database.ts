import { config } from "./config/config";
import sql from "mssql";

export default class Database {
  poolconnection = new sql.ConnectionPool(config);
  connected = false;

  async connect() {
    try {
      console.log(`Database connecting...${this.connected}`);
      if (this.connected === false) {
        this.poolconnection = await sql.connect(config);
        this.connected = true;
        console.log("Database connection successful");
      } else {
        console.log("Database already connected");
      }
    } catch (error) {
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  async disconnect() {
    try {
      this.poolconnection.close();
      console.log("Database connection closed");
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  async executeQuery(query: string) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request.query(query);

    return result.rowsAffected[0];
  }

  async getUserPlaylists(id: string | number) {
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request.input("id", sql.Int, +id).query(`
            Select Usuario.username, Album.titulo, Cancion.titulo, Cancion.autor, Cancion.genero from Cancion
            JOIN CancionAlbum on (CancionAlbum.idCancion = Cancion.idCancion)
            JOIN Album on (Album.idAlbum = CancionAlbum.idAlbum)
            join Usuario on (Album.idUsuario = Usuario.idUsuario)
            where Usuario.idUsuario = @id
            order by Usuario.idUsuario;
            `);

    return result.recordset;
  }

  async createUser(data: { username: any; password: any }) {
    await this.connect();
    const request = this.poolconnection.request();
    request.input("username", sql.NVarChar(255), data.username);
    request.input("password", sql.NVarChar(255), data.password);

    const result = await request.query(
      `INSERT INTO Usuario (username, password) VALUES (@username, @password)`
    );

    return result.rowsAffected[0];
  }

  async updateUser(
    userId: number,
    data: { username: string; password: string }
  ) {
    await this.connect();

    const request = this.poolconnection.request();
    request.input("userId", sql.Int, userId);
    request.input("username", sql.NVarChar(255), data.username);
    request.input("password", sql.NVarChar(255), data.password);

    const result = await request.query(
      `UPDATE Usuario SET username = @username, password = @password WHERE IdUsuario = @userId`
    );

    return result.rowsAffected[0];
  }

  async addSongToAlbum(data: { songID: any; albumID: any }) {
    await this.connect();
    const request = this.poolconnection.request();

    const date_ob = new Date();
    const date = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();

    request.input("idCancion", sql.Int, data.songID);
    request.input("idAlbum", sql.Int, data.albumID);
    request.input("fechaAgregado", sql.Date, year + "-" + month + "-" + date);
    request.input("vecesReproducido", sql.Int, 0);

    const result = await request.query(
      `insert into CancionAlbum (
                idAlbum,
                idCancion,
                fechaAgregado,
                vecesReproducido
                )
                values(
                @idAlbum,
                @idCancion,
                @fechaAgregado,
                @vecesReproducido
            )`
    );

    return result.rowsAffected[0];
  }

  async read(id: string | number) {
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request
      .input("id", sql.Int, +id)
      .query(`SELECT * FROM Usuario WHERE idUsuario = 24`);

    return result.recordset[0];
  }

  async obtenerUsuariosPorUsername(data: { username: any; password: any }) {
    await this.connect();

    const request = this.poolconnection.request();

    request.input("username", sql.NVarChar(255), data.username);
    request.input("password", sql.NVarChar(255), data.password);

    const result = await request.query(
      `SELECT * FROM Usuario WHERE username = @username AND password = @password`
    );

    return result.recordset;
  }

  async getAllSongs() {
    await this.connect();

    const request = this.poolconnection.request();

    const result = await request.query(`SELECT * FROM Cancion`);
    return result.recordset;
  }
  async getSongsById(id: string | number) {
    await this.connect();

    const request = this.poolconnection.request();

    const result = await request.input("id", sql.Int, +id)
      .query(`SELECT * FROM Cancion WHERE idCancion = @id`);
    return result.recordset;
  }

  async readAlbums(id: string | number) {
    console.log('id: ' + id);
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request
      .input("id", sql.Int, +id)
      .query(`SELECT * FROM Album WHERE idUsuario = @id`);

    // console.log('result: ' + result.recordset)
    return result.recordset;
  }

  //function to create a new album in de Data Base
  async createSong(data: { title: any; gender: any; date: any; author: any; referenceLink: any }) {
    await this.connect();
    let dateSong = new Date("now");
    const request = this.poolconnection.request();
    request.input("titulo", sql.NVarChar(255), data.title);
    request.input("genero", sql.NVarChar(255), data.gender);
    request.input("fecha", sql.NVarChar(255), data.date);
    request.input("fechaCreacion", sql.Date, dateSong);
    request.input("autor", sql.NVarChar(255), data.author);
    request.input("link", sql.NVarChar(255), data.referenceLink);

    const result = await request.query(
      `INSERT INTO Songs(
                titulo,
                genero,
                fecha,
                fechaCreacion,
                autor,
                link
                )
                values(
                @titulo,
                @genero,
                @fecha,
                @fechaCreacion,
                @autor,
                @link
                )
            )`
    );
    return result.rowsAffected[0];
  }

  async editSong(data: { songId: number, title: string, gender: string, date: Date, author: string, referenceLink: string }) {
    await this.connect();

    const request = this.poolconnection.request();

    request.input('songId', sql.Int(), data.songId);
    request.input('title', sql.NVarChar(255), data.title);
    request.input('gender', sql.NVarChar(255), data.gender);
    request.input('date', sql.Date(), data.date);
    request.input('author', sql.NVarChar(255), data.author);
    request.input('referenceLink', sql.NVarChar(255), data.referenceLink);

    const result = await request.query(`UPDATE Cancion SET Titulo = @title, Genero = @gender,
    FechaLanzamiento = @Date, LinkReferencia = @referenceLink WHERE idCancion = @songId`);

    return result.recordset;
  }

  async getSongReproductions() {
    await this.connect();

    const request = this.poolconnection.request();

    const result = await request.query(
      `SELECT * FROM Cancion ORDER BY vecesReproducidas DESC`
    );

    return result.recordset;
  }

  async deleteSong(songId: number, userId: number) {
    await this.connect();

    const request = this.poolconnection.request();

    request.input('songId', sql.Int(), songId);
	request.input('userId', sql.Int(), userId);

    const result = await request.query(
		`DELETE FROM Cancion
		WHERE idCancion = @songId
		AND idUsuario = @userId`);

    return result.rowsAffected[0];
  }

  async increaseSongReproductions(timesReproduced: number, idCancion: number) {
    await this.connect();

    const request = this.poolconnection.request();
    request.input("timesReproduced", sql.Int, timesReproduced);
    request.input("idCancion", sql.Int, idCancion);

    const result = await request.query(
      `UPDATE Cancion
	  SET vecesReproducidas=@timesReproduced
	  WHERE idCancion = @idCancion`
    );

    return result.recordset;
  }

  async getSongsByDate(){
    await this.connect();

    const request = this.poolconnection.request();

    const result = await request.query(
      `SELECT *
      FROM
      Cancion
      ORDER BY fechaLanzamiento DESC`
      );
    return result.recordset;
  }

  //function to create a new album in de Data Base
  async createAlbum(data: { userId: any; albumTitle: any; description: any }) {
    await this.connect();
    let dateAlbum = new Date("now");
    const request = this.poolconnection.request();
    request.input("idUsuario", sql.Int, data.userId);
    request.input("titulo", sql.NVarChar(255), data.albumTitle);
    request.input("descripcion", sql.NVarChar(255), data.description);
    request.input("fechaCreacion", sql.Date, dateAlbum);

    const result = await request.query(
      `INSERT INTO Albums(
                idUsuario,
                titulo,
                descripcion,
                fechaCreacion
                )
                values(
                @idUsuario,
                @titulo,
                @descripcion,
                @fechaCreacion
                )
            )`
    );
    return result.rowsAffected[0];
  }
  // Function to delete an entire album from the Data Base
  async deleteAlbum(id: any) {
    await this.connect();
    const request = this.poolconnection.request();
    const albumId = Number(id);
    request.input("idAlbum", sql.Int, albumId);
    const result = await request.query(
      `DELETE FROM Albums WHERE idAlbum = @idAlbum`
    );
    return result.rowsAffected[0];
  }
  // Function to modify an album whit matching albumId
  async modifyAlbum(
    albumId: any,
    data: { userId: any; albumTitle: any; description: any }
  ) {
    await this.connect();
    const request = this.poolconnection.request();
    const albumIdAsNumber = Number(albumId);
    request.input("idAlbum", sql.Int, albumIdAsNumber);
    request.input("idUsuario", sql.Int, data.userId);
    request.input("titulo", sql.NVarChar(255), data.albumTitle);
    request.input("descripcion", sql.NVarChar(255), data.description);
    const result = await request.query(
      `
        UPDATE Albums
        SET idUsuario=@idUsuario, titulo=@titulo, descripcion=@descripcion
        WHERE idAlbum=@idAlbum
        `
    );
    return result.rowsAffected[0];
  }
}

