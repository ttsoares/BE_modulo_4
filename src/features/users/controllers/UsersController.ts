import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";

export default class UsersController {

	// Add a user
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const { name, password } = req.body;

		// Check to find if username already exists
		const exist: Array<Object> = await connection.query(`select FROM users WHERE name = '${name}'`);

		if (exist.length) { // If retuns 0 the flow proceeds
			return res.status(400).send("user existe")
		}

		await connection.query(`insert into users(name, password) values('${name}', '${password}')`);
		return res.status(200).send("OK");
	}

	// Check the user's password
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const name = req.query.name;
		const password = req.query.password;

		// verificar se o 'name' já existe
		const exist: Array<Object> = await connection.query(`SELECT name FROM users WHERE name = '${name}'`);

		if (!exist.length) { // If something comes back the user already exists
			return res.status(400).send("usuário não existe")
		}
//----------------------------- To make Typescript allow the use of userID.length
		interface User_ID { uid: number; }
//-----------------------------
		const userID: Array<User_ID> = await connection.query(`SELECT uid FROM users WHERE
			name = '${name}' AND password = '${password}'`);

		if (userID.length) {
			return res.status(200).send(`${userID[0].uid}`); // correct password
		} else {
			return res.status(400).send(false); // incorrect password
		}
	}
}
