import express from 'express';
import db from '../db.js';

export const getAllTodos = (req, res) => {
	const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
	const todos = getTodos.all(req.userId);
	res.json(todos);
};

export const createTodo = (req, res) => {
	const { task } = req.body;

	//provide the columns with params then provide the values in the db
	const insertTodo = db.prepare(
		`INSERT INTO todos (user_id, task) VALUES (?, ?)`
	);

	insertTodo.run(req.userId, task);

	res.json({ id: insertTodo.lastID, task, completed: 0 });
};

export const updateTodo = (req, res) => {
	const { completed } = req.body;
	const { id } = req.params;
	const { page } = req.query;

	const updatedTodos = db.prepare(
		`UPDATE todos SET completed = ? WHERE id = ?`
	);
	updatedTodos.run(completed, id);

	res.json({ message: 'Todo completed' });
};

export const deleteTodo = (req, res) => {
	const { id } = req.params;
	const { userId } = req;

	const deleteTodos = db.prepare(
		`DELETE FROM todos WHERE id = ? AND user_id = ?`
	);
	deleteTodos.run(id, userId);

	res.send({ message: 'task deleted' });
};

export const getTodo = (req, res) => {};
