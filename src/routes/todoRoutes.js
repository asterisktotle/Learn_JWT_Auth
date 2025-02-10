import express from 'express';
import db from '../db.js';
import {
	createTodo,
	getAllTodos,
	updateTodo,
	deleteTodo,
	getTodo,
} from '../controller/todoController.js';

const router = express.Router();

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
