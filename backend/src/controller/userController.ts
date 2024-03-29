import { NextFunction, Request, Response } from 'express';
import Database from '../database';
import passEcrypt from '../config/passEncrypt';
const database = new Database();
const encrypt = new passEcrypt()
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import fs from "fs";
import { IResponse } from '../interfaces/IResponse';


const RSA_PRIVATE_KEY = fs.readFileSync('private.key');

// writeFile function with filename, content and callback function

const getUser = async (req: Request, res: Response) => {

	try {

		// Get the person with the specified ID
		const personId = req.body.userId;
		if (personId) {
			const result = await database.read(personId);
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

	const data = {
		username,
		password
	}

	const response2: IResponse<any[]> = {
		Result: {
			statuscode: "",
			statustext: ""
		},
		data: []
	}
	if (username && password) {
		try {



			const credentials = database.getUsernameByName(username).then((result) => {
				if (result.length > 0) {
					response2.Result.statuscode = "404";
					response2.Result.statustext = "User already exist";
					res.json(response2);
					res.status(200);
				} else {
					const result = database.createUser(data);
					response2.data = data.username
					response2.Result.statuscode = "200";
					response2.Result.statustext = "User " + data.username + " created!";
					res.json(response2);
					res.status(200);
				}

			});

		} catch (err) {



		}
	} else {
		response2.Result.statuscode = "404";
		response2.Result.statustext = "User already exist";
		res.json(response2);
		res.status(200);
	}

};

const validateUser = async (req: Request, res: Response) => {
	const username = req.body.username;
	const password = req.body.password;

	const data = {
		username,
		password
	}
	const response = {
		resultado: {
			statusCode: "",
			statusText: ""
		},
		user: {
			idUsuario: "",
			username: "",
			token: ""
		}
	}
	if (username && password) {
		try {
			const result = await database.obtenerUsuariosPorUsername(data);

			if (result.length === 0) {
				response.resultado.statusCode = "404";
				response.resultado.statusText = "User Not Found";


				res.status(200).json(response);
			} else {


				response.resultado.statusCode = "200";
				response.resultado.statusText = "OK";

				response.user.idUsuario = result[0].idUsuario;
				response.user.username = result[0].username
				const idUser: string = result[0].idUsuario.toString();
				const token = generateJWT(idUser);
				response.user.token = token;


				res.cookie("SESSIONID", jwt, { httpOnly: true, secure: true });

				res.status(200).json(response);
			}

		} catch (err) {
			res.status(500).json({ error: err?.message });
		}
	} else {
		response.resultado.statusCode = "404";
		response.resultado.statusText = "User Not Found";


		res.status(200).json(response);
	}
};


const generateJWT = (userId: string) => {
	const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
		algorithm: 'RS256',
		expiresIn: 2000,
		subject: userId
	})


	return jwtBearerToken;
}



const getUserPlaylists = async (req: Request, res: Response) => {
	try {
		const personId = req.params.idUsuario;

		if (personId) {
			const result = await database.getUserPlaylists(personId);
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
			res.status(200).json({ error: "idCancion or idAlbum could not be null" });
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}

};

const updateUser = async (req: Request, res: Response) => {
	try {

		const userId = req.body.userId;
		const password = req.body.password;
		const username = req.body.username;

		const response: IResponse<any[]> = {
			Result: {
				statuscode: "",
				statustext: ""
			},
			data: []
		}
		if (userId) {
			const data: { username: string, password: string } = { username, password };
			if (password) {
				data.password = password;
			}
			if (username) {
				data.username = username;
			}
			const result = await database.updateUser(userId, data);
			response.Result.statuscode = "200";
			response.Result.statustext = "OK";
			res.json(response);
			res.status(200);
		}
		else {
			response.Result.statuscode = "404";
			response.Result.statustext = "OK";
			res.json(response);
			res.status(200);
		}
	}
	catch (error) {
		res.status(500).send('Error updating user');
	}
};
// Metodo para obtener username por ID
const getUsernameById = async (req: Request, res: Response) => {
	try {
		const personId = req.params.idUsuario;

		if (personId) {
			const result = await database.getUsernameById(personId);
			res.status(200).json(result);
		} else {
			res.status(404);
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
};
// Metodo para obtener password por ID
const getPasswordById = async (req: Request, res: Response) => {
	try {
		const personId = req.params.idUsuario;


		if (personId) {
			const result = await database.getPasswordById(personId);

			res.status(200).json(result);
		} else {
			res.status(404);
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
};

// credentials
const getUserCredentials = async (req: Request, res: Response) => {
	const userId = req.params.id;
	const personId = req.params.idUsuario;

	try {
		const userIdNumber = parseInt(personId, 10);
		const credentials = await database.getUserCredentials(userIdNumber);
		if (credentials) {

			res.status(200).json(credentials);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
};

const getUserDuplicated = async (req: Request, res: Response) => {
	const username = req.params.username;

	try {
		const credentials = await database.getUsernameByName(username);
		if (credentials) {

			res.status(200).json(credentials);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
};






export default { getUser, getUserPlaylists, createUser, addSongToAlbum, validateUser, updateUser, getPasswordById, getUsernameById, getUserCredentials };

