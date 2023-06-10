import { NextFunction, Request, Response } from 'express';
import Database from '../database';

import passEcrypt from '../config/passEncrypt';

const database = new Database();
const encrypt = new passEcrypt()


const getUser = async (req: Request, res: Response) => {

    try {
        // Get the person with the specified ID
        const personId = req.params.userId;
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


const createUser = async (req: Request, res: Response) => {

    // Get the person with the specified ID
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {

        encrypt.encrypt(password).then((p) => {
            console.log("Encrypted: " + p)
            try {

                const data = {
                    username: username,
                    password: p
                }
                console.log(`User Data: ${JSON.stringify(data)}`);
                const result = database.createUser(data);
                console.log(`Result: ${JSON.stringify(result)}`);
                res.status(200).json("User " + data.username + " created!");

            } catch (err) {
                res.status(500).json({ error: err?.message });

            }
        });
    } else {
        res.status(404).json({ error:  "User or Password could not be null"});
    }




};

const getUserPlaylists = async (req: Request, res: Response) => {
    try {
        // Get the person with the specified ID
        const personId = 1;
        console.log(`personId: ${personId}`);

        if (personId) {
            const result = await database.getUserPlaylists(1);
            console.log(`persons: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};

export default { getUser, getUserPlaylists, createUser };