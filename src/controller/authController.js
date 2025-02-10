import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

export const createAccount = (req, res) => {
	console.log('Received body: ', req.body); //debug
	const { username, password } = req.body;

	//save the username and an irreversibly encrypted password
	// convert password into encrypted password
	const hashedPassword = bcrypt.hashSync(password, 10);

	//error handling
	try {
		//prepare a  SQLite command and save the username and encrypted password
		const insertUser = db.prepare(
			`INSERT INTO users (username, password) VALUES (?, ?)`
		);
		const result = insertUser.run(username, hashedPassword);

		//for the new user, add their first todo to the database
		const defaultTodo = 'Hello! Add your first todo';
		const insertTodo = db.prepare(
			`INSERT INTO todos (user_id, task) VALUES (?,?)`
		);
		insertTodo.run(result.lastInsertRowid, defaultTodo);

		//create a token object that expires using jwt
		//it includes rowId, secret token, expiry date
		const token = jwt.sign(
			{ id: result.lastInsertRowid },
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		);
		res.json({ token });
	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}

	console.log('generated password: ', hashedPassword);
	res.sendStatus(200);
};

export const loginAccount = (req, res) => {
	const { username, password } = req.body;

	try {
		//find the  user from the database using SQL command
		const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
		const user = getUser.get(username);

		//if user is not found
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		//compare the password from the stored password in the db using bcrypt
		const passwordIsValid = bcrypt.compareSync(password, user.password);

		//handle invalid password
		if (!passwordIsValid) {
			return res.status(401).send({ message: 'Invalid password' });
		}

		//in the auth middleware, you will decode the id
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '24h',
		});
		res.json({ token });
	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	r;
};
