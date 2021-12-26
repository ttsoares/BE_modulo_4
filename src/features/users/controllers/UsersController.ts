import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";

import { User } from "../../../core/data/database/entities/Users"

export default class UsersController {

	// Add a user
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const { name, password } = req.body;

		// Check to find if username already exists
		//const exist: Array<Object> = await connection.query(`select FROM users WHERE name = '${name}'`);

		const exist: User | undefined = await User.findOne({where: [{name: name}]})

		if (exist) { // If retuns ( 0 || undefined ) the flow proceeds
			return res.status(400).send("Usuário já existe !")
		}

		// await connection.query(`insert into users(name, password) values('${name}', '${password}')`);
		const newUser: User = await new User(name, password).save();

		const temp:object = { name: newUser.name, password: newUser.password }
		return res.status(200).json(temp);
	}

	// Check the user's password
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const name = req.query.name;
		const password = req.query.password;

		// Test if the user do exist
		// const exist: Array<Object> = await connection.query(`SELECT name FROM users WHERE name = '${name}'`);

		const userExist: User | undefined = await User.findOne({where: [{name: name}]})

		if ( ! userExist ) { // If something comes back the user do exists
			return res.status(400).send("Usuário não existe !")
		}

		// const userID: Array<User> = await connection.query(`SELECT uid FROM users WHERE
		// 	name = '${name}' AND password = '${password}'`);

		if (userExist.password === password) {
			return res.status(200).send(`${userExist.uid}`); // correct password
		} else {
			return res.status(400).send("Erro ao tentar gravar usuário na base"); // incorrect password
		}
	}

	// List all Users
	// Check the user's password
	public async index_all(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const allUsers = await User.find()
		return res.status(200).json(allUsers)
	}
}
