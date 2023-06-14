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
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        encrypt.encrypt(password).then((encryptedPassword) => {
            console.log("Encrypted: " + encryptedPassword)
            try {
                const data = {
                    username: username,
                    password: password
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
        res.status(404).json({ error: "User or Password could not be null" });
    }
};

const validateUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = {
        username: username,
        password: password
    }
    const response = {
        resultado: {
            statusCode: "",
            statusText: ""
        },
        user: {
            idUsuario: "",
            username: ""
        }
    }
    if (username && password) {
        try {
            console.log(`User Data: ${JSON.stringify(data)}`);
            const result = await database.obtenerUsuariosPorUsername(data);
            console.log(`Result: ${JSON.stringify(result)}`);
            if (JSON.stringify(result) === undefined) {
                response.resultado.statusCode = "404";
                response.resultado.statusText = "User Not Found";

                response.user.idUsuario = result.idUsuario;
                response.user.username = result.username
                res.status(200).json(response);
            } else {
                response.resultado.statusCode = "200";
                response.resultado.statusText = "OK";

                response.user.idUsuario = result.idUsuario;
                response.user.username = result.username
                res.status(200).json(response);
            }
       
        } catch (err) {
            res.status(500).json({ error: err?.message });
        }
    } else {
        response.resultado.statusCode = "404";
        response.resultado.statusText = "User Not Found";


        res.status(404).json(response);
    }
};


const getUserPlaylists = async (req: Request, res: Response) => {
    try {
        const personId = req.params.idUsuario;
        console.log(`personId: ${personId}`);

        if (personId) {
            const result = await database.getUserPlaylists(personId);
            console.log(`persons: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};


const addSongToAlbum = async (req: Request, res: Response) => {
    try {
        const songID = req.body.idCancion;
        const albumID = req.body.idAlbum;
        if (songID && albumID) {
            const data = {
                songID: songID,
                albumID: albumID
            }
            const result = await database.addSongToAlbum(data);
            res.status(200).json("La cancion " + data.songID + " fue agregada correctamente al album " + data.albumID);
        } else {
            res.status(404).json({ error: "idCancion or idAlbum could not be null" });
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};




export default { getUser, getUserPlaylists, createUser, addSongToAlbum, validateUser };