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
					username,
					password
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

	if (username && password) {


		try {
			const data = {
				username,
				password
			}
			console.log(`User Data: ${JSON.stringify(data)}`);
			const result = await database.obtenerUsuariosPorUsername(data);
			console.log(`Result: ${JSON.stringify(result)}`);
			res.status(200).json(result);

		} catch (err) {
			res.status(500).json({ error: err?.message });
		}

	} else {
		res.status(404).json({ error: "User or Password could not be null" });
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
				songID,
				albumID
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

const updateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.body.idUsuario;
		const password = req.body.password;
		const username = req.body.username;
		if (userId) {
			if (password || username) {
				const data: { password?: string, username?: string } = {};
				if (password) {
					data.password = password;
				}
				if (username) {
					data.username = username;
				}
				const result = await database.updateUser(userId, data);
				res.send('User updated successfully');
			}
			else {
				res.status(400).send('Please provide at least one value to update');
		  	}
		}
		else {
			res.status(400).send('Invalid user ID');
		}
	}
	catch (error) {
		res.status(500).send('Error updating user');
	}
};

export default { getUser, getUserPlaylists, createUser, addSongToAlbum, validateUser };