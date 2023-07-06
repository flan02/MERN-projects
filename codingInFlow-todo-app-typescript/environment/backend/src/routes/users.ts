import express from 'express';
import * as usersController from '../controllers/users';
import { requiresAuth } from '../midleware/auth';

const router = express.Router();
router.get('/', requiresAuth, usersController.getAuthentifiedUser)
router.post('/signup', usersController.signUp)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)

export default router;