import express from 'express';
import controller from '../controller/userController'

const router = express.Router();

router.get('/getUsers', (req, res, next) => {
    controller.getUser(req, res)
});

router.get('/getUserPlaylists/:idUsuario', (req, res) => {
    controller.getUserPlaylists(req, res)
});
router.put('/addSongToAlbum', (req, res) => {
    controller.addSongToAlbum(req, res)
});




router.put('/updateUser', (req, res) => {
    controller.updateUser(req, res)
});





export default router;