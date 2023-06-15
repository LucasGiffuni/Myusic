import express from 'express';
import controller from '../controller/userController'

const router = express.Router();



router.post('/createUser', (req, res) => {
    controller.createUser(req, res)
});

router.post('/validateUser', (req, res) => {
    controller.validateUser(req, res)
});




export default router;