import { NextFunction, Request, Response } from 'express';
import Database from '../database';

import passEcrypt from '../config/passEncrypt';

const database = new Database();
const encrypt = new passEcrypt()

const getAllSongs = async (req: Request, res: Response) => {
    try {
        const result = await database.getAllSongs();
        res.json(result);
        res.status(200);

    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}


export default {getAllSongs};