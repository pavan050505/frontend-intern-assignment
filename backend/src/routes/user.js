import { Router } from 'express';
import { body } from 'express-validator';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.put('/me', requireAuth, [body('name').isString().isLength({ min: 2 })], updateProfile);

export default router;



