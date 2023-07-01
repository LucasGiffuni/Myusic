var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Database from '../database';
import passEcrypt from '../config/passEncrypt';
const database = new Database();
const encrypt = new passEcrypt();
import jwt from 'jsonwebtoken';
import fs from "fs";
const RSA_PRIVATE_KEY = fs.readFileSync('private.key');
// writeFile function with filename, content and callback function
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the person with the specified ID
        const personId = req.body.userId;
        if (personId) {
            const result = yield database.read(personId);
            res.status(200).json(result);
        }
        else {
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const data = {
        username,
        password
    };
    const response = {
        resultado: {
            statusCode: "",
            statusText: ""
        },
        user: {
            idUsuario: "",
            username: ""
        }
    };
    if (username && password) {
        try {
            const result = database.createUser(data);
            response.resultado.statusCode = "200";
            response.resultado.statusText = "OK";
            response.user.username = data.username;
            res.status(200).json(response);
        }
        catch (err) {
            response.resultado.statusCode = "500";
            response.resultado.statusText = "Internal Server Error";
        }
    }
    else {
        response.resultado.statusCode = "404";
        response.resultado.statusText = "User Not Found";
        res.status(200).json(response);
    }
});
const validateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const data = {
        username,
        password
    };
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
    };
    if (username && password) {
        try {
            const result = yield database.obtenerUsuariosPorUsername(data);
            if (result.length === 0) {
                response.resultado.statusCode = "404";
                response.resultado.statusText = "User Not Found";
                res.status(200).json(response);
            }
            else {
                response.resultado.statusCode = "200";
                response.resultado.statusText = "OK";
                response.user.idUsuario = result[0].idUsuario;
                response.user.username = result[0].username;
                const idUser = result[0].idUsuario.toString();
                const token = generateJWT(idUser);
                response.user.token = token;
                res.cookie("SESSIONID", jwt, { httpOnly: true, secure: true });
                res.status(200).json(response);
            }
        }
        catch (err) {
            res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
        }
    }
    else {
        response.resultado.statusCode = "404";
        response.resultado.statusText = "User Not Found";
        res.status(200).json(response);
    }
});
const generateJWT = (userId) => {
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 2000,
        subject: userId
    });
    return jwtBearerToken;
};
const getUserPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personId = req.params.idUsuario;
        if (personId) {
            const result = yield database.getUserPlaylists(personId);
            res.status(200).json(result);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const addSongToAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songID = req.body.idCancion;
        const albumID = req.body.idAlbum;
        if (songID && albumID) {
            const data = {
                songID,
                albumID
            };
            const result = yield database.addSongToAlbum(data);
            res.status(200).json("La cancion " + data.songID + " fue agregada correctamente al album " + data.albumID);
        }
        else {
            res.status(404).json({ error: "idCancion or idAlbum could not be null" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const password = req.body.password;
        const username = req.body.username;
        if (userId) {
            const data = { username, password };
            if (password) {
                data.password = password;
            }
            if (username) {
                data.username = username;
            }
            const result = yield database.updateUser(userId, data);
            res.send('User updated successfully');
        }
        else {
            res.status(400).send('Invalid user ID');
        }
    }
    catch (error) {
        res.status(500).send('Error updating user');
    }
});
// Metodo para obtener username por ID
const getUsernameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personId = req.params.idUsuario;
        if (personId) {
            const result = yield database.getUsernameById(personId);
            res.status(200).json(result);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
// Metodo para obtener password por ID
const getPasswordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personId = req.params.idUsuario;
        if (personId) {
            const result = yield database.getPasswordById(personId);
            res.status(200).json(result);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
// credentials
const getUserCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const personId = req.params.idUsuario;
    try {
        const userIdNumber = parseInt(personId, 10);
        const credentials = yield database.getUserCredentials(userIdNumber);
        if (credentials) {
            res.status(200).json(credentials);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
export default { getUser, getUserPlaylists, createUser, addSongToAlbum, validateUser, updateUser, getPasswordById, getUsernameById, getUserCredentials };
//# sourceMappingURL=userController.js.map