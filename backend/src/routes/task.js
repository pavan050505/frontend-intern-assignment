import { Router } from 'express';
import { body, param } from 'express-validator';
import { createTask, deleteTask, listTasks, updateTask } from '../controllers/taskController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listTasks);
router.post('/', requireAuth, [body('title').isString().isLength({ min: 1 })], createTask);
router.put('/:id', requireAuth, [param('id').isMongoId()], updateTask);
router.delete('/:id', requireAuth, [param('id').isMongoId()], deleteTask);

export default router;



