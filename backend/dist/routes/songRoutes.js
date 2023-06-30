import express from 'express';
import controller from '../controller/songController';
const router = express.Router();
router.get('/getSongs', (req, res) => {
    controller.getAllSongs(req, res);
});
router.get('/getSongById/:songId', (req, res) => {
    controller.getSongById(req, res);
});
router.get('/getSongReproductions', (req, res) => {
    controller.getSongReproductions(req, res);
});
router.post('/increaseSongReproductions', (req, res) => {
    controller.increaseSongReproductions(req, res);
});
router.put('/editSong', (req, res) => {
    controller.editSong(req, res);
});
router.delete('/deleteSong', (req, res) => {
    controller.deleteSong(req, res);
});
router.post('/createSong/:idUser', (req, res) => {
    controller.createSong(req, res);
});
router.get('/getSongsByDate', (req, res) => {
    controller.getSongsByDate(req, res);
});
router.get('/getSongsBySearchValue/:searchValue', (req, res) => {
    controller.getSongBySearchValue(req, res);
});
export default router;
//# sourceMappingURL=songRoutes.js.map