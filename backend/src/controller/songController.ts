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
        const timesReproduced = await database.getSongReproductions();
        const songId = req.body.songId
        let i: number = 0;
        const result = await database.increaseSongReproductions(parseInt(timesReproduced.toString()) + 1, songId);
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

const editSong = async (req: Request, res: Response) => {
    const songId = req.body.songId
    const title = req.body.title;
    const gender = req.body.gender;
    const referenceLink = req.body.referenceLink;
    const author = req.body.auth;
    const date = req.body.date;
    //if para validar los datos que me llegan
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
        const result = await database.deleteSong(songId);
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

const createSong = async (req: Request, res: Response) => {
    const title = req.body.title;
    const gender = req.body.gender;
    const referenceLink = req.body.referenceLink;
    const author = req.body.auth;
    const date = req.body.date;

    // try {
    //     const data = {
    //         title,
    //         gender,
    //         date,
    //         author,
    //         referenceLink
    //     }
    //     const result = await database.createSong(data);
    //     const response:IResponse<any[]> = {
    //         Result:{
    //             statuscode:"",
    //             statustext:""
    //         },
    //         data:result
    //     }
    //     if (result.length > 0){
    //         response.Result.statuscode = "200";
    //         response.Result.statustext = "OK";
    //         res.status(200);
    //         res.json(response);
    //     }else{
    //         response.Result.statuscode = "404";
    //         response.Result.statustext = "Not found";
    //         res.status(404);
    //         res.json(response);
    //     }
    // } catch (err) {
    //     res.status(500).json({ error: err?.message });
    // }
}




export default { getAllSongs, getSongById, getSongReproductions, increaseSongReproductions, editSong, createSong, deleteSong };
