import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import { getUser, getAllUsers } from '../controllers/general.js';


const router = express.Router();

router.get('/user/:id', getUser);
router.get('/users', getAllUsers);

/** register logic using passport-local-mongoose TODO refractor **/



export default router;