import { NextFunction, Request, Response } from 'express';
import Database from '../database';

import passEcrypt from '../config/passEncrypt';
import { IResponse } from '../interfaces/IResponse';

const database = new Database();
const encrypt = new passEcrypt();


const getAlbums = async (req: Request, res: Response) => {
    try {
        const personid = req.params.idUsuario;
        const result = await database.readAlbums(personid);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        console.log(`Albums: ${result}`);
        if (result.length > 1) {
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
};

const createAlbum = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.idUsuario);
        const albumTitle = String(req.body.titulo);
        const albumDescription = String(req.body.descripcion)

        const input = {
            userId,
            albumTitle,
            albumDescription
        }

        const result = await database.createAlbum(input);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: []
        }
        console.log(`Albums: ${result}`);
        if (result > 1) {
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
};



export default { getAlbums,createAlbum };