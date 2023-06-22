import { NextFunction, Request, Response } from 'express';
import Database from '../database';
import passEcrypt from '../config/passEncrypt';
const database = new Database();
import jwt from 'jsonwebtoken';
import fs from "fs";

const addSongToAlbum = async (req: Request, res: Response) => {
    const songID = req.body.username;
    const albumID = req.body.password;

    const data = {
        songID: songID,
        albumID: albumID
    }
    const response = {
        resultado: {
            statusCode: "",
            statusText: ""
        }
    }
    if (songID && albumID) {
        try {
            const result = database.addSongToAlbum(data);

            response.resultado.statusCode = "200";
            response.resultado.statusText = "OK";

            res.status(200).json(response);
        } catch (err) {
            response.resultado.statusCode = "500";
            response.resultado.statusText = "Internal Server Error";
        }
    } else {
        response.resultado.statusCode = "404";
        response.resultado.statusText = "Song / Album not found";


        res.status(404).json(response);
    }
};



export default { addSongToAlbum };