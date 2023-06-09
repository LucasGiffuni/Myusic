import { NextFunction, Request, Response } from 'express';
import { Connect, Query } from '../database';
import Database from '../database';

const database = new Database();

const createBook = async (req: Request, res: Response, next: NextFunction) => {

    const { author, title } = req.body;

    const query = `select * from User`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

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

export default { createBook, getAllBooks };