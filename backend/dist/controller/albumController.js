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
const database = new Database();
const addSongToAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songID = req.body.songID;
    const albumID = req.body.albumID;
    const data = {
        songID,
        albumID
    };
    const response = {
        Result: {
            statuscode: "",
            statustext: ""
        },
        data: []
    };
    if (songID && albumID) {
        try {
            const result = database.addSongToAlbum(data);
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200).json(response);
        }
        catch (err) {
            response.Result.statuscode = "505";
            response.Result.statustext = "INTERNAL SERVER ERROR";
        }
    }
    else {
        response.Result.statuscode = "404";
        response.Result.statustext = "SongID / AlbumID not found";
        res.status(200).json(response);
    }
});
const removeSongFromAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songID = req.body.songID;
    const albumID = req.body.albumID;
    const data = {
        songID,
        albumID
    };
    const response = {
        Result: {
            statuscode: "",
            statustext: ""
        },
        data: []
    };
    if (songID && albumID) {
        try {
            const result = database.removeSongFromAlbum(data);
            response.Result.statuscode = "200";
            response.Result.statustext = "OK";
            res.status(200).json(response);
        }
        catch (err) {
            response.Result.statuscode = "505";
            response.Result.statustext = "INTERNAL SERVER ERROR";
        }
    }
    else {
        response.Result.statuscode = "404";
        response.Result.statustext = "SongID / AlbumID not found";
        res.status(200).json(response);
    }
});
const getAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personid = req.params.idUsuario;
        const result = yield database.readAlbums(personid);
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
const getUserAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personid = req.params.idUsuario;
        const result = yield database.getUserPlaylists(personid);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result.length > 1) {
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
const getAlbumsSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personid = req.params.idAlbum;
        const result = yield database.getAlbumsSongs(personid);
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
const createAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.idUsuario);
        const albumTitle = String(req.body.titulo);
        const albumDescription = String(req.body.descripcion);
        const input = {
            userId,
            albumTitle,
            albumDescription
        };
        const result = yield database.createAlbum(input);
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
const getAlbumsDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idAlbum = req.params.idAlbum;
        const result = yield database.readAlbumsByIdAlbum(idAlbum);
        const response = {
            Result: {
                statuscode: "",
                statustext: ""
            },
            data: result
        };
        if (result) {
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
export default {
    addSongToAlbum, getAlbums, createAlbum, getUserAlbums, getAlbumsDetails, getAlbumsSongs, removeSongFromAlbum
};
//# sourceMappingURL=albumController.js.map