//import required modules
//this is experiment for sqlite node my node version i use is v23.7.0
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoute.js';
import todosRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

//initialize express app and set port
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
// This allows the server to handle JSON data in POST and PUT requests.
// Without this, req.body in an API request would be undefined.
app.use(express.json());

// Since ES Modules don’t have __dirname and __filename (unlike CommonJS),
//  we generate them manually:
// fileURLToPath(import.meta.url): Converts the module URL to a file path.
// dirname(__filename): Extracts the directory path.
//get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//get the directory name from the file path
const __dirname = dirname(__filename);

//middleware
// This serves static files (CSS, JS, images, etc.) from the /public folder
//express.static() expects a directory,
app.use(express.static(path.join(__dirname, '../public')));

// When a user visits http://localhost:5000/, the server sends index.html from /public.
// This ensures the homepage is loaded correctly
//serving up the HTML file from the /public directory
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todosRoutes);

// start the server
app.listen(PORT, () =>
	console.log(`Server started at http://localhost:${PORT}`)
);
