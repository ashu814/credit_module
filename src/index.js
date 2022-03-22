import http from "http";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import glob from 'glob';
import cors from 'cors';

const app = express();
app.server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(cors());


const responseHandler = require('./middlewares/responseHandler');

app.use('/', responseHandler);
let initRoutes = () => {
	// including all routes
	glob("./Routes/*.js", {cwd: path.resolve("./src")}, (err, routes) => {
		if (err) {
			console.log("Error occured including routes");
			return;
		}
		routes.forEach((routePath) => {
			require(routePath).getRouter(app); // eslint-disable-line
		});
		console.log("included " + routes.length + " route files");
	});
}


initRoutes();

app.listen(port, () => {
	console.log("Server is running on port "+port);
});


