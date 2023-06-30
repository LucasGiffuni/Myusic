import { NextFunction, Request, Response } from 'express';
import Database from '../database';
import passEcrypt from '../config/passEncrypt';
const database = new Database();
import jwt from 'jsonwebtoken';
import fs from "fs";
import { IResponse } from '../interfaces/IResponse';
import { IAlbum } from '../interfaces/IAlbum';

const addSongToAlbum = async (req: Request, res: Response) => {
    const songID = req.body.songID;
    const albumID = req.body.albumID;

    const data = {
        songID: songID,
        albumID: albumID
    }
    const response: IResponse<any[]> = {
        Result: {
            statuscode: "",
            statustext: ""
        },
        data: []
    }
    if (songID && albumID) {
        try {
            const result = database.addSongToAlbum(data);

            response.Result.statuscode = "200";
            response.Result.statustext = "OK";

            res.status(200).json(response);
        } catch (err) {
            response.Result.statuscode = "505";
            response.Result.statustext = "INTERNAL SERVER ERROR";
        }
    } else {
        response.Result.statuscode = "404";
        response.Result.statustext = "SongID / AlbumID not found";

        res.status(404).json(response);
    }
};
const removeSongFromAlbum = async (req: Request, res: Response) => {
    const songID = req.body.songID;
    const albumID = req.body.albumID;

    const data = {
        songID: songID,
        albumID: albumID
    }
    const response: IResponse<any[]> = {
        Result: {
            statuscode: "",
            statustext: ""
        },
        data: []
    }
    if (songID && albumID) {
        try {
            const result = database.removeSongFromAlbum(data);

            response.Result.statuscode = "200";
            response.Result.statustext = "OK";

            res.status(200).json(response);
        } catch (err) {
            response.Result.statuscode = "505";
            response.Result.statustext = "INTERNAL SERVER ERROR";
        }
    } else {
        response.Result.statuscode = "404";
        response.Result.statustext = "SongID / AlbumID not found";

        res.status(404).json(response);
    }
};
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
};
const getUserAlbums = async (req: Request, res: Response) => {
    try {
        const personid = req.params.idUsuario;
        const result = await database.getUserPlaylists(personid);
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
const getAlbumsSongs = async (req: Request, res: Response) => {
    try {
        const personid = req.params.idAlbum;
        const result = await database.getAlbumsSongs(personid);
        const response: IResponse<any[]> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }

        console.log(result)
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        } else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(200);
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
};
const getAlbumsDetails = async (req: Request, res: Response) => {
    try {
        const idAlbum = req.params.idAlbum;
        const result = await database.readAlbumsByIdAlbum(idAlbum);
        const response: IResponse<any> = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        }
        console.log(`Albums: ${result}`);
        if (result) {
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




export default {
    addSongToAlbum, getAlbums, createAlbum, getUserAlbums, getAlbumsDetails, getAlbumsSongs, removeSongFromAlbum
};