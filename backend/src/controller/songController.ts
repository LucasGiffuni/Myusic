import { NextFunction, Request, Response } from 'express';
import Database from '../database';
import {IResponse} from '../interfaces/IResponse';
import passEcrypt from '../config/passEncrypt';
import { ISong } from '../interfaces/ISong';

const database = new Database();
const encrypt = new passEcrypt()


const getAllSongs = async (req: Request, res: Response) => {
     
    try {
        const result = await database.getAllSongs();
        const response:IResponse<any[]> = {
            Result:{
                statuscode: "",
                statustext:""
            },
            data:result
        }
        if (result.length > 0){
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        }else{
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
        const response:IResponse<any[]> = {
            Result:{
                statuscode:"",
                statustext:""
            },
            data:result
        }
        if (result.length > 0){
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        }else{
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}


export default {getAllSongs, getSongReproductions};