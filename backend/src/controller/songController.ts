import { NextFunction, Request, Response } from 'express';
import Database from '../database';
import { IResponse } from '../interfaces/IResponse';
import passEcrypt from '../config/passEncrypt';
import { ISong } from '../interfaces/ISong';

const database = new Database();
const encrypt = new passEcrypt()


const getAllSongs = async (req: Request, res: Response) => {

    try {
        const result = await database.getAllSongs();
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(404);
            res.json(response);
        }

    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}
const getSongById = async (req: Request, res: Response) => {
    const songId = req.params.songId

    try {
        const result = await database.getSongsById(songId);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(404);
            res.json(response);
        }

    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getSongReproductions = async (req: Request, res: Response) => {
    try {
        const result = await database.getSongReproductions();
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const increaseSongReproductions = async (req: Request, res: Response) => {
    try {
        const songId = req.body.songId
        const timesReproduced = await database.getSongReproductionsByID(songId);
        console.log(timesReproduced)
        let i: number = 0;
        const result = await database.increaseSongReproductions(parseInt(timesReproduced.vecesReproducidas) + 1, songId);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: []
        }
        if (result > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }

}

const editSong = async (req: Request, res: Response) => {
    const songId = req.body.songId
    const title = req.body.title;
    const gender = req.body.gender;
    const referenceLink = req.body.referenceLink;
    const author = req.body.auth;
    const date = req.body.date;
    try {
        const data = {
            songId,
            title,
            gender,
            date,
            author,
            referenceLink
        }
        const result = await database.editSong(data);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(404);
            res.json(response);
        }

    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const deleteSong = async (req: Request, res: Response) => {
    try {
        const songId: number = parseInt(req.body.songId)
        const userId: number = parseInt(req.body.userId)
        const result = await database.deleteSong(songId, userId);
        const response: IResponse<number> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const createSong = async (req: Request, res: Response) => {
    const titulo = req.body.titulo;
    const genero = req.body.genero;
    const linkReferencia = req.body.linkReferencia;
    const autor = req.body.autor;
    const fechaLanzamiento = req.body.fechaLanzamiento;
    const idUsuario = parseInt(req.params.idUser);
    const vecesReproducidas = 0;
    const idCancion = 0;
    const imagen = req.body.imagen;
    try {
        const data: ISong = {
            idCancion,
            titulo,
            genero,
            fechaLanzamiento,
            linkReferencia,
            autor,
            vecesReproducidas,
            imagen,
            idUsuario
        }
        const result = await database.createSong(data);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: []
        }
        if (result > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(404);
            res.json(response);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getSongsByDate = async (req: Request, res: Response) => {
    try {
        const result = await database.getSongsByDate();
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getSongBySearchValue = async (req: Request, res: Response) => {
    try {
        const searchValue = req.params.searchValue
       const dataI ={
        searchValue
        }

        const result = await database.searchSongByTitle(dataI);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}




export default { getAllSongs, getSongById, getSongReproductions, increaseSongReproductions, editSong, createSong, deleteSong, getSongsByDate ,getSongBySearchValue};
