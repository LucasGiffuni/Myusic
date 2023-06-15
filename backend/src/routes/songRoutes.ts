import express from 'express';
import controller from '../controller/songController'

const router = express.Router();

router.get('/getSongs', (req,res) => {
    controller.getAllSongs(req,res);
})

router.get('/getSongReproductions',(req,res) => {
    controller.getSongReproductions(req,res);
})


export default router;