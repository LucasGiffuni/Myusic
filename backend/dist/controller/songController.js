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
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database.getAllSongs();
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(200);
            res.json(response);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const getSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    try {
        const result = yield database.getSongsById(songId);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(200);
            res.json(response);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const getSongReproductions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database.getSongReproductions();
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const increaseSongReproductions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.body.songId;
        const timesReproduced = yield database.getSongReproductionsByID(songId);
        const i = 0;
        const result = yield database.increaseSongReproductions(parseInt(timesReproduced.vecesReproducidas) + 1, songId);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: []
        };
        if (result > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const editSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.body.songId;
    const title = req.body.title;
    const gender = req.body.gender;
    const referenceLink = req.body.referenceLink;
    const author = req.body.auth;
    const date = req.body.date;
    try {
        const data = {
            songId,
            title,
            gender,
            date,
            author,
            referenceLink
        };
        const result = yield database.editSong(data);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(200);
            res.json(response);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = parseInt(req.body.songId);
        const userId = parseInt(req.body.userId);
        const result = yield database.deleteSong(songId, userId);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const titulo = req.body.titulo;
    const genero = req.body.genero;
    const linkReferencia = req.body.linkReferencia;
    const autor = req.body.autor;
    const fechaLanzamiento = req.body.fechaLanzamiento;
    const idUsuario = parseInt(req.params.idUser);
    const vecesReproducidas = 0;
    const idCancion = 0;
    const imagen = req.body.imagen;
    try {
        const data = {
            idCancion,
            titulo,
            genero,
            fechaLanzamiento,
            linkReferencia,
            autor,
            vecesReproducidas,
            imagen,
            idUsuario
        };
        const result = yield database.createSong(data);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: []
        };
        if (result > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200);
            res.json(response);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.status(200);
            res.json(response);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const getSongsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database.getSongsByDate();
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
const getSongBySearchValue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchValue = req.params.searchValue;
        const dataI = {
            searchValue
        };
        const result = yield database.searchSongByTitle(dataI);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 0) {
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.json(response);
            res.status(200);
        }
        else {
            response.Result.statuscode = "404";
            response.Result.statustext = "Not found";
            res.json(response);
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
    }
});
export default { getAllSongs, getSongById, getSongReproductions, increaseSongReproductions, editSong, createSong, deleteSong, getSongsByDate, getSongBySearchValue };
//# sourceMappingURL=songController.js.map