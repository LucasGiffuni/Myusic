import { config } from '../config2';
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
            where Usuario.idUsuario = 1
            order by Usuario.idUsuario;
            `);

        return result.recordset;
    }

    async create(data: { firstName: any; lastName: any; }) {
        await this.connect();
        const request = this.poolconnection.request();

        request.input('firstName', sql.NVarChar(255), data.firstName);
        request.input('lastName', sql.NVarChar(255), data.lastName);

        const result = await request.query(
            `INSERT INTO Person (firstName, lastName) VALUES (@firstName, @lastName)`
        );

        return result.rowsAffected[0];
    }

    async readAll() {
        await this.connect();
        const request = this.poolconnection.request();
        const result = await request.query(`SELECT * FROM Person`);
        const response = result.recordsets;
        return response;
    }

    async read(id: string | number) {
        await this.connect();

        const request = this.poolconnection.request();
        const result = await request
            .input('id', sql.Int, +id)
            .query(`SELECT * FROM Usuario WHERE idUsuario = @id`);

        return result.recordset[0];
    }

    async update(id: string | number, data: { firstName: any; lastName: any; }) {
        await this.connect();

        const request = this.poolconnection.request();

        request.input('id', sql.Int, +id);
        request.input('firstName', sql.NVarChar(255), data.firstName);
        request.input('lastName', sql.NVarChar(255), data.lastName);

        const result = await request.query(
            `UPDATE Person SET firstName=@firstName, lastName=@lastName WHERE id = @id`
        );

        return result.rowsAffected[0];
    }

    async delete(id: any) {
        await this.connect();

        const idAsNumber = Number(id);

        const request = this.poolconnection.request();
        const result = await request
            .input('id', sql.Int, idAsNumber)
            .query(`DELETE FROM Person WHERE id = @id`);

        return result.rowsAffected[0];
    }
}