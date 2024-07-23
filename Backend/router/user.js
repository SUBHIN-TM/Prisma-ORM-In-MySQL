import express from 'express';
const router =express.Router();
import home from '../controllers/home.js';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import { attendenceChecking,attendenceMarking } from '../controllers/attendence.js';
import verify from '../middleware/jwtVerify.js';

router.get("/",home)
router.post('/register',register)
router.post('/login',login)
router.get("/attendenceChecking",verify,attendenceChecking)
router.post("/attendenceMarking",verify,attendenceMarking)





export default router