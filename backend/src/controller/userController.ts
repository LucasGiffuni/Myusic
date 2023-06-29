import { NextFunction, Request, Response } from 'express';
import Database from '../database';
import passEcrypt from '../config/passEncrypt';
const database = new Database();
const encrypt = new passEcrypt()
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import fs from "fs";


const RSA_PRIVATE_KEY = fs.readFileSync('private.key');

// writeFile function with filename, content and callback function

const getUser = async (req: Request, res: Response) => {

	try {
		// Get the person with the specified ID
		const personId = req.body.userId;
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
			const result = database.createUser(data);

			response.resultado.statusCode = "200";
			response.resultado.statusText = "OK";

			response.user.username = data.username
			res.status(200).json(response);
		} catch (err) {
			response.resultado.statusCode = "500";
			response.resultado.statusText = "Internal Server Error";


		}
	} else {
		response.resultado.statusCode = "404";
		response.resultado.statusText = "User Not Found";


		res.status(404).json(response);
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
			username: "",
			token: ""
		}
	}
	if (username && password) {
		try {
			console.log(`User Data: ${JSON.stringify(data)}`);
			const result = await database.obtenerUsuariosPorUsername(data);
			console.log(`Result: ${JSON.stringify(result)}`);

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
				console.log("user " + idUser.toString())
				const jwt = generateJWT(idUser);
				response.user.token = jwt;

		
				res.cookie("SESSIONID", jwt, { httpOnly: true, secure: true });

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
		const userId = parseInt(req.body.idUsuario);
		const password = req.body.password;
		const username = req.body.username;
		if (userId) {
			const data: { username: string, password: string } = { username, password };
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
			res.status(400).send('Invalid user ID');
		}
	}
	catch (error) {
		res.status(500).send('Error updating user');
	}
};
//Metodo para obtener username por ID 
const getUsernameById = async (req: Request, res: Response) => {
	try {
		const personId = req.params.idUsuario;
		console.log(`personId: ${personId}`);

		if (personId) {
			const result = await database.getUsernameById(personId);
			console.log(`username: ${JSON.stringify(result)}`);
			res.status(200).json(result);
		} else {
			res.status(404);
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
};
	//Metodo para obtener password por ID 
const getPasswordById = async (req: Request, res: Response) => {
	try {
		const personId = req.params.idUsuario;
		console.log(`personId: ${personId}`);

		if (personId) {
			const result = await database.getPasswordById(personId);
			console.log(`password: ${JSON.stringify(result)}`);
			res.status(200).json(result);
		} else {
			res.status(404);
		}
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
};



export default { getUser, getUserPlaylists, createUser, addSongToAlbum, validateUser, updateUser,getPasswordById,getUsernameById };

