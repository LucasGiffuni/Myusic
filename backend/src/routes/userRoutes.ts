import express from 'express';
import controller from '../controller/userController'

const router = express.Router();

router.post('/create/book', controller.createBook);
router.get('/getUsers', controller.getAllBooks);

export default router;