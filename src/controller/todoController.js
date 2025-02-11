import db from '../db.js';
import prisma from '../prismaClient.js';

export const getAllTodos = async (req, res) => {
	// const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
	const todos = await prisma.todo.findMany({
		where: {
			userId: req.userId,
		},
	});

	// const todos = getTodos.all(req.userId);
	res.json(todos);
};

export const createTodo = async (req, res) => {
	const { task } = req.body;

	//provide the columns with params then provide the values in the db
	// const insertTodo = db.prepare(
	// 	`INSERT INTO todos (user_id, task) VALUES (?, ?)`
	// );

	// insertTodo.run(req.userId, task);

	const todo = await prisma.todo.create({
		data: {
			task,
			userId: req.userId,
		},
	});

	// res.json({ id: insertTodo.lastID, task, completed: 0 });
	res.json(todo);
};

export const updateTodo = async (req, res) => {
	const { completed } = req.body;
	const { id } = req.params;
	// const { page } = req.query;

	// const updatedTodos = db.prepare(
	// 	`UPDATE todos SET completed = ? WHERE id = ?`
	// );
	// updatedTodos.run(completed, id);

	const updatedTodo = await prisma.todo.update({
		where: {
			id: parseInt(id),
			userId: req.userId,
		},
		data: {
			completed: !!completed,
		},
	});

	// res.json({ message: 'Todo completed' });
	res.json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
	const { id } = req.params;
	const { userId } = req;

	// const deleteTodos = db.prepare(
	// 	`DELETE FROM todos WHERE id = ? AND user_id = ?`
	// );
	// deleteTodos.run(id, userId);

	const deleteTodos = await prisma.todo.delete({
		where: {
			id: parseInt(id),
			userId,
		},
	});

	res.send({ message: 'task deleted' });
};

export const getTodo = (req, res) => {};
