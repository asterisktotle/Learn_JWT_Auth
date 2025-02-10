import express from 'express';

import { createAccount, loginAccount } from '../controller/authController.js';

// set up the router so you can use it in server
const router = express.Router();

//register a new user endpoint /auth/register
router.post('/register', createAccount);

router.post('/login', loginAccount);

export default router;
