import express from 'express';
import controller from '../controller/albumsController'

const router = express.Router();

router.get('/getAlbums/:idUsuario', (req, res) => {
    controller.getAlbums(req, res)
});
router.post('/createAlbum/:idUsuario', (req, res) => {
    controller.createAlbum(req, res)
});


export default router;