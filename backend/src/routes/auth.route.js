import express from 'express';
import { checkAuth, logIn, logOut, signUp } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login',logIn);

router.post('/signup', signUp);

router.post('/logout',protectRoute, logOut);

router.get('/checkauth',protectRoute,checkAuth);

export default router;