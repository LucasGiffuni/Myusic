import express from 'express';
import controller from '../controller/userController'

const router = express.Router();

router.get('/getUsers', (req, res) => {
    controller.getUser(req, res)
});
router.get('/getUserPlaylists', (req, res) => {
    controller.getUserPlaylists(req, res)
});
router.post('/createUser', (req, res) => {
    controller.createUser(req, res)
});

export default router;