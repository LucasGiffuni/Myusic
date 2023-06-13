import express, { Express } from "express";
import http from 'http';
import bodyParser from 'body-parser';

import userRoutes from "./routes/userRoutes";
import songRoutes from "./routes/songRoutes";

const app = express();

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}

	next();
});

/** Routes go here */
app.use('/user', userRoutes);
app.use('/song',songRoutes);

/** Error handling */
app.use((req, res, next) => {
	const error = new Error('Not found');

	res.status(404).json({
		message: error.message
	});
});


const httpServer = http.createServer(app);
httpServer.listen(3000);