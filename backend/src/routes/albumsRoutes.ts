import express from 'express';
import controller from '../controller/albumsController'

const router = express.Router();

router.get('/getAlbums/:idUsuario', (req, res) => {
    controller.getAlbums(req, res)
});


export default router;