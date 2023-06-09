import { NextFunction, Request, Response } from 'express';
import Database from '../database';

const database = new Database();

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get the person with the specified ID
        const personId = 1;
        console.log(`personId: ${personId}`);
        if (personId) {
            const result = await database.read(personId);
            console.log(`persons: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};

export default { getAllBooks };