import express from 'express';
import controller from '../controller/userController'

const router = express.Router();

router.get('/getUsers', (req, res) => {
    controller.getUser(req, res)
});
router.get('/getUserPlaylists/:idUsuario', (req, res) => {
    controller.getUserPlaylists(req, res)
});
router.put('/addSongToAlbum', (req, res) => {
    controller.addSongToAlbum(req, res)
});


router.post('/createUser', (req, res) => {
    controller.createUser(req, res)
});

router.get('/validateUser', (req, res) => {
    controller.validateUser(req, res)
});
export default router;