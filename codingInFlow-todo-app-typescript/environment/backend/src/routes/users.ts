import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();
router.get('/', usersController.getAuthentifiedUser)
router.post('/signup', usersController.signUp)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)

export default router;