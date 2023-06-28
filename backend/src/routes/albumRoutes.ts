import express from 'express';
import controller from '../controller/albumController'

const router = express.Router();



router.post('/addSongToAlbum', (req, res) => {
    controller.addSongToAlbum(req, res)
});

router.get('/getAlbums/:idUsuario', (req, res) => {
    controller.getAlbums(req, res)
});
router.get('/getUserAlbums/:idUsuario', (req, res) => {
    controller.getAlbums(req, res)
});
router.post('/createAlbum/:idUsuario', (req, res) => {
    controller.createAlbum(req, res)
});




export default router;