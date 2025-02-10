import express from 'express';
import db from '../db.js';

export const getAllTodos = (req, res) => {
	const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
	const todos = getTodos.all(req.userId);
	res.json(todos);
};

export const getTodo = (req, res) => {};
export const createTodo = (req, res) => {};
export const updateTodo = (req, res) => {};
export const deleteTodo = (req, res) => {};
