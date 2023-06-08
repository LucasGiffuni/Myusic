import express, { Express } from "express";
import bodyParser from 'body-parser';


const app = express();
const port = 3000;


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/user/createuser', (req, res) => {



	res.send('User got created successfully');
});



app.listen(port);