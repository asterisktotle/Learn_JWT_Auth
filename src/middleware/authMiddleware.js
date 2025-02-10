import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	const token = req.headers['authorization'];
	//frontend should send token like this
	// Authorization: Bearer <JWT_TOKEN>
	// const token = req.headers['authorization']?.split(' ')[1];

	//check if it has token
	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	//verify the token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		//check if token is valid
		if (err) {
			return res.status(403).json({ message: 'Invalid token' });
		}

		// If the token is valid, the id from the decoded JWT payload is attached
		// to req.userId, allowing protected routes to identify the authenticated user.
		req.userId = decoded.id;
		next();
	});
};

export default authMiddleware;
