import express from 'express';
import { createNewUser } from '../models/user/userModel.js';
import { activatUserController, createNewUserController } from '../controllers/authController.js';

const router = express.Router()


//Creating a user router

router.post('/register', createNewUserController);

//activating a user
router.post('/activate-user', activatUserController)

export default router;