import express from 'express';
import controller from '../controller/songController'

const router = express.Router();

router.get('/getSongs', (req,res) => {
    controller.getAllSongs(req,res)
})


export default router;