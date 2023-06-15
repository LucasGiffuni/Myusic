import { config } from './config/config';
import sql from 'mssql';

export default class Database {
    poolconnection = new sql.ConnectionPool(config);
    connected = false;


    async connect() {
        try {
            console.log(`Database connecting...${this.connected}`);
            if (this.connected === false) {
                this.poolconnection = await sql.connect(config);
                this.connected = true;
                console.log('Database connection successful');
            } else {
                console.log('Database already connected');
            }
        } catch (error) {
            console.error(`Error connecting to database: ${JSON.stringify(error)}`);
        }
    }

    async disconnect() {
        try {
            this.poolconnection.close();
            console.log('Database connection closed');
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
        const result = await request
            .input('id', sql.Int, +id)
            .query(`
            Select Usuario.username, Album.titulo, Cancion.titulo, Cancion.autor, Cancion.genero from Cancion
            JOIN CancionAlbum on (CancionAlbum.idCancion = Cancion.idCancion)
            JOIN Album on (Album.idAlbum = CancionAlbum.idAlbum)
            join Usuario on (Album.idUsuario = Usuario.idUsuario)
            where Usuario.idUsuario = @id
            order by Usuario.idUsuario;
            `);

        return result.recordset;
    }

    async createUser(data: { username: any; password: any; }) {
        await this.connect();
        const request = this.poolconnection.request();
        request.input('username', sql.NVarChar(255), data.username);
        request.input('password', sql.NVarChar(255), data.password);

        const result = await request.query(
            `INSERT INTO Usuario (username, password) VALUES (@username, @password)`
        );

        return result.rowsAffected[0];
    }

    async addSongToAlbum(data: { songID: any; albumID: any; }) {
        await this.connect();
        const request = this.poolconnection.request();

        const date_ob = new Date();
        const date = ("0" + date_ob.getDate()).slice(-2);
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        const year = date_ob.getFullYear();
        const hours = date_ob.getHours();


        request.input('idCancion', sql.Int, data.songID);
        request.input('idAlbum', sql.Int, data.albumID);
        request.input('fechaAgregado', sql.Date, year + "-" + month + "-" + date);
        request.input('vecesReproducido', sql.Int, 0);

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
            .input('id', sql.Int, +id)
            .query(`SELECT * FROM Usuario WHERE idUsuario = @id`);

        return result.recordset[0];
    }

    async obtenerUsuariosPorUsername(data: { username: any; password: any; }) {
        await this.connect();

        const request = this.poolconnection.request();


        request.input('username', sql.NVarChar(255), data.username);
        request.input('password', sql.NVarChar(255), data.password);

        const result = await request.query(`SELECT * FROM Usuario WHERE username = @username AND password = @password`);

        return result.recordset[0];
    }

    async getAllSongs(){
        await this.connect();

        const request = this.poolconnection.request();

        const result = await request.query(`SELECT * FROM Cancion`);
        return result.recordset;
    }

    async getSongReproductions(){
        await this.connect();

        const request = this.poolconnection.request();

        const result = await request.query(`SELECT * FROM Cancion ORDER BY vecesReproducidas DESC`);

        return result.recordset;
    }

}