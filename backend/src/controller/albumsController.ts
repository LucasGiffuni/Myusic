import { NextFunction, Request, Response } from 'express';
import Database from '../database';

import passEcrypt from '../config/passEncrypt';

const database = new Database();
const encrypt = new passEcrypt()


const getAlbums = async (req: Request, res: Response) => {

    try {
    
        // Get the person with the specified I
        const personId = req.params.idUsuario;
        console.log(`personId: ${personId}`);
        if (personId) {
            const result = await database.readAlbums(personId);
            const response = {
                resultado: {
                    statusCode: '200',
                    statusText: 'OK'
                },
                albums: result
            }

            console.log(`persons: ${JSON.stringify(result)}`);
            res.status(200).json(response);
        } else {
            const response = {
                resultado: {
                    statusCode: '404',
                    statusText: 'NOT FOUND'
                }   
            }
            res.status(404).json(response);

        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};


export default { getAlbums };