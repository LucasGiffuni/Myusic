var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "./config/config";
import sql from "mssql";
export default class Database {
    constructor() {
        this.poolConnection = new sql.ConnectionPool(config);
        this.connected = false;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected === false) {
                    this.poolConnection = yield sql.connect(config);
                    this.connected = true;
                }
            }
            catch (error) {
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.poolConnection.close();
            }
            catch (error) {
            }
        });
    }
    executeQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.query(query);
            return result.rowsAffected[0];
        });
    }
    getUserPlaylists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.input("id", sql.Int, +id).query(`
            Select Usuario.username, Album.titulo, Cancion.titulo, Cancion.autor, Cancion.genero from Cancion
            JOIN CancionAlbum on (CancionAlbum.idCancion = Cancion.idCancion)
            JOIN Album on (Album.idAlbum = CancionAlbum.idAlbum)
            join Usuario on (Album.idUsuario = Usuario.idUsuario)
            where Usuario.idUsuario = @id
            order by Usuario.idUsuario;
            `);
            return result.recordset;
        });
    }
    getAlbumsSongs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.input("id", sql.Int, +id).query(`
    select Cancion.idCancion, Cancion.titulo, Cancion.genero, Cancion.fechaLanzamiento, Cancion.linkReferencia, Cancion.autor, Cancion.vecesReproducidas, Cancion.imagen,Cancion.idUsuario from Cancion
    join CancionAlbum on (CancionAlbum.idCancion = Cancion.idCancion) join
    Album on (Album.idAlbum = CancionAlbum.idAlbum) where Album.idAlbum = @id
            `);
            return result.recordset;
        });
    }
    searchSongByTitle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("searchValue", sql.NVarChar(255), `%${data.searchValue}%`);
            const result = yield request.query(`select * from Cancion where titulo LIKE @searchValue`);
            return result.recordset;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("username", sql.NVarChar(255), data.username);
            request.input("password", sql.NVarChar(255), data.password);
            const result = yield request.query(`INSERT INTO Usuario (username, password) VALUES (@username, @password)`);
            return result.rowsAffected[0];
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("userId", sql.Int, userId);
            request.input("username", sql.NVarChar(255), data.username);
            request.input("password", sql.NVarChar(255), data.password);
            const result = yield request.query(`UPDATE Usuario SET username = @username, password = @password WHERE IdUsuario = @userId`);
            return result.rowsAffected[0];
        });
    }
    addSongToAlbum(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const dateOb = new Date();
            const date = ("0" + dateOb.getDate()).slice(-2);
            const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
            const year = dateOb.getFullYear();
            const hours = dateOb.getHours();
            request.input("idCancion", sql.Int, data.songID);
            request.input("idAlbum", sql.Int, data.albumID);
            request.input("fechaAgregado", sql.Date, year + "-" + month + "-" + date);
            request.input("vecesReproducido", sql.Int, 0);
            const result = yield request.query(`insert into CancionAlbum (
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
            )`);
            return result.rowsAffected[0];
        });
    }
    removeSongFromAlbum(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("idCancion", sql.Int, data.songID);
            request.input("idAlbum", sql.Int, data.albumID);
            const result = yield request.query(`delete from CancionAlbum where idCancion = @idCancion and idAlbum = @idAlbum`);
            return result.rowsAffected[0];
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request
                .input("id", sql.Int, +id)
                .query(`SELECT * FROM Usuario WHERE idUsuario = 24`);
            return result.recordset[0];
        });
    }
    obtenerUsuariosPorUsername(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("username", sql.NVarChar(255), data.username);
            request.input("password", sql.NVarChar(255), data.password);
            const result = yield request.query(`SELECT * FROM Usuario WHERE username = @username AND password = @password`);
            return result.recordset;
        });
    }
    getAllSongs() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.query(`SELECT * FROM Cancion`);
            return result.recordset;
        });
    }
    getSongsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.input("id", sql.Int, +id)
                .query(`SELECT * FROM Cancion WHERE idCancion = @id`);
            return result.recordset;
        });
    }
    readAlbums(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request
                .input("id", sql.Int, +id)
                .query(`SELECT * FROM Album WHERE idUsuario = @id`);
            return result.recordset;
        });
    }
    readAlbumsByIdAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request
                .input("id", sql.Int, +id)
                .query(`SELECT * FROM Album WHERE idAlbum = @id`);
            return result.recordset;
        });
    }
    // function to create a new album in de Data Base
    createSong(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("titulo", sql.NVarChar(255), data.titulo);
            request.input("genero", sql.NVarChar(255), data.genero);
            request.input("fechaLanzamiento", sql.Date, data.fechaLanzamiento);
            request.input("autor", sql.NVarChar(255), data.autor);
            request.input("linkReferencia", sql.NVarChar(255), data.linkReferencia);
            request.input("idUsuario", sql.Int, data.idUsuario);
            request.input("imagen", sql.NVarChar(255), data.imagen);
            const result = yield request.query(`INSERT INTO Cancion(
                titulo,
                genero,
                fechaLanzamiento,
                linkReferencia,
                autor,
                vecesReproducidas,
                imagen,
                idUsuario
                )
                values(
                @titulo,
                @genero,
                @fechaLanzamiento,
                @linkReferencia,
                @autor,
                0,
                @imagen,
                @idUsuario
                )
            `);
            return result.rowsAffected[0];
        });
    }
    editSong(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input('songId', sql.Int(), data.songId);
            request.input('title', sql.NVarChar(255), data.title);
            request.input('gender', sql.NVarChar(255), data.gender);
            request.input('date', sql.Date(), data.date);
            request.input('author', sql.NVarChar(255), data.author);
            request.input('referenceLink', sql.NVarChar(255), data.referenceLink);
            const result = yield request.query(`UPDATE Cancion SET Titulo = @title, Genero = @gender,
    FechaLanzamiento = @Date, LinkReferencia = @referenceLink WHERE idCancion = @songId`);
            return result.recordset;
        });
    }
    getSongReproductions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.query(`SELECT * FROM Cancion ORDER BY vecesReproducidas DESC`);
            return result.recordset;
        });
    }
    getSongReproductionsByID(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input('songId', sql.Int(), songId);
            const result = yield request.query(`SELECT * FROM Cancion where idCancion = @songId `);
            return result.recordset[0];
        });
    }
    deleteSong(songId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input('songId', sql.Int(), songId);
            request.input('userId', sql.Int(), userId);
            const result = yield request.query(`DELETE FROM Cancion
		WHERE idCancion = @songId
		AND idUsuario = @userId`);
            return result.rowsAffected[0];
        });
    }
    increaseSongReproductions(timesReproduced, idCancion) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            request.input("timesReproduced", sql.Int, timesReproduced);
            request.input("idCancion", sql.Int, idCancion);
            const result = yield request.query(`UPDATE Cancion
	  SET vecesReproducidas=@timesReproduced
	  WHERE idCancion = @idCancion`);
            return result.rowsAffected[0];
        });
    }
    getSongsByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.query(`SELECT *
      FROM
      Cancion
      ORDER BY fechaLanzamiento DESC`);
            return result.recordset;
        });
    }
    // function to create a new album in de Data Base
    createAlbum(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const dateAlbum = new Date("2023-06-24");
            const request = this.poolConnection.request();
            request.input("idUsuario", sql.Int, data.userId);
            request.input("titulo", sql.NVarChar(255), data.albumTitle);
            request.input("descripcion", sql.NVarChar(255), data.albumDescription);
            request.input("fechaCreacion", sql.Date, dateAlbum);
            const result = yield request.query(`INSERT INTO Album(
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
            `);
            return result.rowsAffected[0];
        });
    }
    // Function to delete an entire album from the Data Base
    deleteAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const albumId = Number(id);
            request.input("idAlbum", sql.Int, albumId);
            const result = yield request.query(`DELETE FROM Albums WHERE idAlbum = @idAlbum`);
            return result.rowsAffected[0];
        });
    }
    // Function to modify an album whit matching albumId
    modifyAlbum(albumId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const albumIdAsNumber = Number(albumId);
            request.input("idAlbum", sql.Int, albumIdAsNumber);
            request.input("idUsuario", sql.Int, data.userId);
            request.input("titulo", sql.NVarChar(255), data.albumTitle);
            request.input("descripcion", sql.NVarChar(255), data.description);
            const result = yield request.query(`
        UPDATE Albums
        SET idUsuario=@idUsuario, titulo=@titulo, descripcion=@descripcion
        WHERE idAlbum=@idAlbum
        `);
            return result.rowsAffected[0];
        });
    }
    // function to get username by id
    getUsernameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.input("id", sql.Int, +id).query(`
            Select Usuario.username
            where Usuario.idUsuario = @id
            `);
            return result.recordset;
        });
    }
    // function to get password by id
    getPasswordById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.input("id", sql.Int, +id).query(`
            Select Usuario.password
            where Usuario.idUsuario = @id
            `);
            return result.recordset;
        });
    }
    // get credential
    getUserCredentials(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const request = this.poolConnection.request();
            const result = yield request.input("id", sql.Int, id).query(`
      SELECT username, password
      FROM Usuario
      WHERE idUsuario = @id
    `);
            return result.recordset[0];
        });
    }
}
//# sourceMappingURL=database.js.map