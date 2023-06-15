import express from 'express';
import controller from '../controller/albumController'

const router = express.Router();



router.post('/addSongToAlbum', (req, res) => {
    controller.addSongToAlbum(req, res)
});





export default router;