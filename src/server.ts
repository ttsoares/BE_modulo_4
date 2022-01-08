// Import the Express function with the methods Req., Res.
import express, { Request, Response } from "express";

import 'dotenv/config'
import cors from 'cors';

// Function nedded by TypeORM
import "reflect-metadata";

// Import class with the routes
import UsersRoutes from "./features/users/routes/Routes";
import MessagesRoutes from "./features/messages/routes/Routes";

// Import that class that open the connection Node <--> Postgresql
import Database from "./core/data/connections/Database";

// Clone the Express function in the 'app'
const app = express();

// Install the middleware json() in the 'app'
app.use(express.json());

app.use(cors())
app.set('view engine', 'ejs');
//app.use(express.urlencoded({ extended: false }));

// Test route
app.get("/", (req: Request, res: Response) => {
	res.send("OK");
});

// Class instantiation and initialization
const usersRoutes = new UsersRoutes().init();
const messagesRoutes = new MessagesRoutes().init();

// Insert in the function 'app' the respectives objects
app.use(usersRoutes);
app.use(messagesRoutes);

const port = process.env.PORT || 7777

// Open the connection with PSQL and associate to it then
// Express service at the port 'post'
new Database()
	.openConnection()
	.then(() => app.listen(port, () => console.log(`Server up on PORT ${port}`)));
